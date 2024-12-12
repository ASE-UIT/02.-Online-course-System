import {formatCurrency} from "@/utils/converter";


export function OrderInformation({numItems, total, order}) {

    return (
        <div className="w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.07)]">
            <h2 className="text-2xl font-semibold">Thông tin đơn hàng ({numItems} khóa học)</h2>

            <div className="space-y-4">
                {/*<div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                        Tạm tính ({numItems} sản phẩm)
                    </span>
                    <span className="font-medium">
                        đ{formatCurrency(total)}
                    </span>
                </div>*/}
                {order.map((course) => (
                    <div key={course?.id} className="flex items-center justify-between">
                    <span className="text-text/md/medium font-worksans text-black">
                        {course?.course?.name}
                    </span>
                        <span className="font-medium">
                        đ{formatCurrency(course?.price)}
                    </span>
                    </div>

                ))}
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

const CartCourse = (course)=>{
    return (
        <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                        {course?.course?.name}
                    </span>
            <span className="font-medium">
                        hehe
                    </span>
        </div>
    );
}