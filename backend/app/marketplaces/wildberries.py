import httpx


class WildberriesClient:
    base_url = "https://statistics-api.wildberries.ru"

    def __init__(self, token: str) -> None:
        self.token = token

    async def request(self, path: str, params: dict[str, object] | None = None) -> object:
        headers = {"Authorization": self.token}
        async with httpx.AsyncClient(base_url=self.base_url, timeout=30) as client:
            response = await client.get(path, headers=headers, params=params)
            response.raise_for_status()
            return response.json()

