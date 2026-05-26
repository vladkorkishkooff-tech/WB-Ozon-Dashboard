from fastapi import APIRouter, Depends

from app.config import Settings, get_settings

router = APIRouter()


@router.get("/integrations/status")
async def integration_status(settings: Settings = Depends(get_settings)) -> dict[str, object]:
    return {
        "wildberries": {
            "configured": bool(settings.wb_api_token),
            "scope": ["orders", "stocks", "products"],
        },
        "ozon": {
            "configured": bool(settings.ozon_client_id and settings.ozon_api_key),
            "scope": ["postings", "stocks", "products", "finance"],
        },
    }


@router.get("/dashboard/summary")
async def dashboard_summary() -> dict[str, object]:
    return {
        "period": "30d",
        "revenue": 3_646_000,
        "orders": 1231,
        "buyout_rate": 81.8,
        "stock_risks": 3,
        "mode": "demo",
    }

