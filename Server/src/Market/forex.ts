import WebSocket from "ws";
import "dotenv/config";

const apikey = process.env.TWELVE_API_KEY;

const ws = new WebSocket()
