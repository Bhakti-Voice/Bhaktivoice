export async function authHeaders(user: { getIdToken: () => Promise<string> }) {
  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
