import "@testing-library/jest-dom";
import { vi } from "vitest";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

// Mock do scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();
