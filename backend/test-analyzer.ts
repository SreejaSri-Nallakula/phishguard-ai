import { analyzeAndSave } from "./src/controllers/scanController.js";

// Mocking express Request and Response
const req = {
  body: {
    content: "Urgent: Verify your account immediately at http://secure-login.com",
    userId: null
  }
} as any;

const res = {
  json: (data: any) => console.log("Success:", JSON.stringify(data, null, 2)),
  status: (code: number) => ({
    json: (data: any) => console.log(`Error ${code}:`, JSON.stringify(data, null, 2))
  })
} as any;

console.log("Testing analyzeAndSave...");
// Note: This will still fail if it tries to use Prisma, but I want to see how far it gets.
analyzeAndSave(req, res).catch(err => console.error("Caught Error:", err));
