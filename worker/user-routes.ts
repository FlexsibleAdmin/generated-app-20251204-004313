import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity, TaskEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import { Task } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'CF Workers Demo' }}));
  // USERS
  app.get('/api/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await UserEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/users', async (c) => {
    const { name } = (await c.req.json()) as { name?: string };
    if (!name?.trim()) return bad(c, 'name required');
    return ok(c, await UserEntity.create(c.env, { id: crypto.randomUUID(), name: name.trim() }));
  });
  // CHATS
  app.get('/api/chats', async (c) => {
    await ChatBoardEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await ChatBoardEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/chats', async (c) => {
    const { title } = (await c.req.json()) as { title?: string };
    if (!title?.trim()) return bad(c, 'title required');
    const created = await ChatBoardEntity.create(c.env, { id: crypto.randomUUID(), title: title.trim(), messages: [] });
    return ok(c, { id: created.id, title: created.title });
  });
  // MESSAGES
  app.get('/api/chats/:chatId/messages', async (c) => {
    const chat = new ChatBoardEntity(c.env, c.req.param('chatId'));
    if (!await chat.exists()) return notFound(c, 'chat not found');
    return ok(c, await chat.listMessages());
  });
  app.post('/api/chats/:chatId/messages', async (c) => {
    const chatId = c.req.param('chatId');
    const { userId, text } = (await c.req.json()) as { userId?: string; text?: string };
    if (!isStr(userId) || !text?.trim()) return bad(c, 'userId and text required');
    const chat = new ChatBoardEntity(c.env, chatId);
    if (!await chat.exists()) return notFound(c, 'chat not found');
    return ok(c, await chat.sendMessage(userId, text.trim()));
  });
  // TASKS
  app.get('/api/tasks', async (c) => {
    const { items } = await TaskEntity.list(c.env);
    // sort by creation date descending
    items.sort((a, b) => b.createdAt - a.createdAt);
    return ok(c, items);
  });
  app.post('/api/tasks', async (c) => {
    const { text } = (await c.req.json()) as { text?: string };
    if (!text?.trim()) return bad(c, 'text is required');
    const task: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    const created = await TaskEntity.create(c.env, task);
    return ok(c, created);
  });
  app.put('/api/tasks/:id', async (c) => {
    const id = c.req.param('id');
    const { text, completed } = (await c.req.json()) as Partial<Task>;
    if (typeof text === 'undefined' && typeof completed === 'undefined') {
      return bad(c, 'text or completed field is required');
    }
    const taskEntity = new TaskEntity(c.env, id);
    if (!await taskEntity.exists()) return notFound(c, 'task not found');
    const updatedTask = await taskEntity.mutate(current => ({
      ...current,
      ...(typeof text !== 'undefined' && { text: text.trim() }),
      ...(typeof completed !== 'undefined' && { completed }),
    }));
    return ok(c, updatedTask);
  });
  app.delete('/api/tasks/:id', async (c) => {
    const id = c.req.param('id');
    const deleted = await TaskEntity.delete(c.env, id);
    if (!deleted) return notFound(c, 'task not found');
    return ok(c, { id, deleted });
  });
  // DELETE: Users
  app.delete('/api/users/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await UserEntity.delete(c.env, c.req.param('id')) }));
  app.post('/api/users/deleteMany', async (c) => {
    const { ids } = (await c.req.json()) as { ids?: string[] };
    const list = ids?.filter(isStr) ?? [];
    if (list.length === 0) return bad(c, 'ids required');
    return ok(c, { deletedCount: await UserEntity.deleteMany(c.env, list), ids: list });
  });
  // DELETE: Chats
  app.delete('/api/chats/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await ChatBoardEntity.delete(c.env, c.req.param('id')) }));
  app.post('/api/chats/deleteMany', async (c) => {
    const { ids } = (await c.req.json()) as { ids?: string[] };
    const list = ids?.filter(isStr) ?? [];
    if (list.length === 0) return bad(c, 'ids required');
    return ok(c, { deletedCount: await ChatBoardEntity.deleteMany(c.env, list), ids: list });
  });
}