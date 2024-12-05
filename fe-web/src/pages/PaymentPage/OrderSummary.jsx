
import { Button } from "@/components/ui/button"

export function OrderSummary({ numItems, total, onCheckout }) {
    const formatCurrency = (amount) => {
        return amount.toLocaleString("vi-VN")
    }

    return (
        <div className="w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.07)]">
            <h2 className="text-2xl font-semibold">Thông tin đơn hàng</h2>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            Tạm tính ({numItems} sản phẩm)
          </span>
                    <span className="font-medium">
            đ{formatCurrency(total)}
          </span>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
          <span className="text-lg font-semibold">
            Tổng cộng:
          </span>
                    <span className="text-lg font-bold text-blue-600">
            đ{formatCurrency(total)}
          </span>
                </div>
            </div>
        </div>
    )
}

