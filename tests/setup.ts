import "@testing-library/jest-dom";
import { afterAll, beforeAll, vi } from "vitest";
import { server } from './msw/server'
import { afterEach } from "node:test";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock do scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();
