import { useEffect, useRef, useState } from 'react';

type WsStatus = 'connecting' | 'connected' | 'disconnected';

export function useWebSocket(url: string) {
  const [status, setStatus] = useState<WsStatus>('connecting');
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setStatus('connected');

    ws.onmessage = (event: MessageEvent) => {
      setLastMessage(typeof event.data === 'string' ? event.data : null);
    };

    ws.onerror = () => setStatus('disconnected');
    ws.onclose = () => setStatus('disconnected');

    return () => {
      ws.close();
    };
  }, [url]);

  return { status, lastMessage };
}
