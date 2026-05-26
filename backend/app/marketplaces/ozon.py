import httpx


class OzonClient:
    base_url = "https://api-seller.ozon.ru"

    def __init__(self, client_id: str, api_key: str) -> None:
        self.client_id = client_id
        self.api_key = api_key

    async def request(self, path: str, payload: dict[str, object] | None = None) -> object:
        headers = {
            "Client-Id": self.client_id,
            "Api-Key": self.api_key,
            "Content-Type": "application/json",
        }
        async with httpx.AsyncClient(base_url=self.base_url, timeout=30) as client:
            response = await client.post(path, headers=headers, json=payload or {})
            response.raise_for_status()
            return response.json()

