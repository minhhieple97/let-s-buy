import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server';
import { Role, User } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { env } from '@env';


async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = await headers();

  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!,
  };
  const wh = new Webhook(env.CLERK_WEBHOOK_SIGNING_SECRET);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(req: Request) {
  const payload = await validateRequest(req);
  const body = JSON.stringify(payload);

  try {
    await handleWebhookEvent(payload, body);
    return Response.json({ message: 'Received webhook' });
  } catch (error) {
    console.error('Webhook verification failed:', error);
    return new Response('Webhook verification failed', { status: 400 });
  }
}

async function handleWebhookEvent(event: WebhookEvent, rawBody: string) {
  const data = JSON.parse(rawBody).data;

  switch (event.type) {
    case 'user.created':
    case 'user.updated':
      await handleUserCreatedOrUpdated(data);
      break;
    case 'user.deleted':
      await handleUserDeleted(data.id);
      break;
  }
}

async function handleUserCreatedOrUpdated(data: any) {
  const userData: Partial<User> = {
    id: data.id,
    name: `${data.first_name} ${data.last_name}`,
    email: data.email_addresses[0].email_address,
    picture: data.image_url,
    role: data.private_metadata?.role || Role.USER,
  };
  const dbUser = await prisma.user.upsert({
    where: { email: userData.email },
    update: userData,
    create: {
      id: userData.id!,
      name: userData.name!,
      email: userData.email!,
      picture: userData.picture!,
      role: userData.role || Role.USER,
    },
  });

  const clerk = await clerkClient();
  await clerk.users.updateUserMetadata(data.id, {
    privateMetadata: {
      role: dbUser.role || Role.USER,
    },
  });
}

async function handleUserDeleted(userId: string) {
  await prisma.user.delete({
    where: { id: userId },
  });
}
