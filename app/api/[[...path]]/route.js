import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

let client;
let clientPromise;

function getClient() {
  if (!clientPromise) {
    client = new MongoClient(process.env.MONGO_URL);
    clientPromise = client.connect();
  }
  return clientPromise;
}

async function getDb() {
  const c = await getClient();
  const dbName = process.env.DB_NAME || 'aureon';
  return c.db(dbName);
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

function json(data, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders });
}

export async function GET(request, { params }) {
  try {
    const path = (params?.path || []).join('/');
    const db = await getDb();

    if (path === '' || path === 'health') {
      return json({ status: 'ok', service: 'aureon-api', time: new Date().toISOString() });
    }

    if (path === 'contacts') {
      const items = await db.collection('contacts').find({}).sort({ createdAt: -1 }).limit(100).toArray();
      return json({ items: items.map(({ _id, ...rest }) => rest) });
    }

    if (path === 'quotes') {
      const items = await db.collection('quotes').find({}).sort({ createdAt: -1 }).limit(100).toArray();
      return json({ items: items.map(({ _id, ...rest }) => rest) });
    }

    if (path === 'newsletter') {
      const items = await db.collection('newsletter').find({}).sort({ createdAt: -1 }).limit(200).toArray();
      return json({ items: items.map(({ _id, ...rest }) => rest) });
    }

    if (path === 'stats') {
      const [contacts, quotes, subscribers] = await Promise.all([
        db.collection('contacts').countDocuments(),
        db.collection('quotes').countDocuments(),
        db.collection('newsletter').countDocuments(),
      ]);
      return json({ contacts, quotes, subscribers });
    }

    return json({ error: 'Not found', path }, 404);
  } catch (err) {
    console.error('GET error:', err);
    return json({ error: 'Server error', detail: err.message }, 500);
  }
}

export async function POST(request, { params }) {
  try {
    const path = (params?.path || []).join('/');
    const db = await getDb();
    const body = await request.json().catch(() => ({}));

    if (path === 'contact') {
      const { name, email, phone, company, message } = body;
      if (!name || !email || !message) {
        return json({ error: 'Missing required fields (name, email, message)' }, 400);
      }
      const doc = {
        id: uuidv4(),
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        phone: phone ? String(phone).slice(0, 60) : '',
        company: company ? String(company).slice(0, 200) : '',
        message: String(message).slice(0, 5000),
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      await db.collection('contacts').insertOne({ ...doc });
      return json({ ok: true, id: doc.id, message: 'Thank you! Our team will reach out within 24 hours.' });
    }

    if (path === 'quote') {
      const required = ['name', 'email', 'projectType'];
      for (const k of required) {
        if (!body[k]) return json({ error: `Missing field: ${k}` }, 400);
      }
      const doc = {
        id: uuidv4(),
        name: String(body.name).slice(0, 200),
        company: String(body.company || '').slice(0, 200),
        email: String(body.email).slice(0, 200),
        phone: String(body.phone || '').slice(0, 60),
        projectType: String(body.projectType).slice(0, 100),
        location: String(body.location || '').slice(0, 200),
        area: String(body.area || '').slice(0, 60),
        budget: String(body.budget || '').slice(0, 60),
        timeline: String(body.timeline || '').slice(0, 60),
        description: String(body.description || '').slice(0, 5000),
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      await db.collection('quotes').insertOne({ ...doc });
      return json({ ok: true, id: doc.id, message: 'Quote request received. We will get back within 24 hours.' });
    }

    if (path === 'newsletter') {
      const { email } = body;
      if (!email) return json({ error: 'Email required' }, 400);
      const doc = { id: uuidv4(), email: String(email).slice(0, 200), createdAt: new Date().toISOString() };
      await db.collection('newsletter').updateOne({ email: doc.email }, { $setOnInsert: doc }, { upsert: true });
      return json({ ok: true, message: 'Subscribed! Watch your inbox for insights.' });
    }

    return json({ error: 'Not found', path }, 404);
  } catch (err) {
    console.error('POST error:', err);
    return json({ error: 'Server error', detail: err.message }, 500);
  }
}
