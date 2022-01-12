// Returns a random integer in range [min..max] (all inclusive)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const r = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateMockProductTotalCount = () => {
    return r(3, 100);
};

// Return one (or more -- pass the first param) mock products
export const generateMockProduct = (count = 1) => {
    return [...Array(count)].map((_, index) => ({
        id: `product-id-${index + 1}`,
        title: `Product number ${index + 1}`,
        image: `https://picsum.photos/200?random=${r(0, 1024)}`,
        bidderCount: r(0, 100),
        bidHighestPrice: 100000 * r(1, 999),
        bidHighestUser: `username${r(1, 100)}`,
        buyNowPrice: r(0, 1) ? 1000000 * r(1, 999) : null,
        startTime: `2022-01-04T${r(10, 15)}:00:00.000Z`,
        endTime: `2022-01-0${r(5, 9)}T0${r(0, 9)}:${r(10, 59)}:${r(10, 59)}.999Z`,
        isOnWatchlist: r(0, 1) ? true : false,
    }));
};

export const generateCategories = () => {
    return [
        { category_id: 1, parent_category_id: null, name: "Điện tử" },
        { category_id: 2, parent_category_id: 1, name: "Điện thoại di động" },
        { category_id: 3, parent_category_id: 1, name: "Laptop" },
        { category_id: 4, parent_category_id: 1, name: "TV" },
        { category_id: 5, parent_category_id: null, name: "Sức khỏe" },
        { category_id: 6, parent_category_id: 5, name: "Thực phẩm chức năng" },
        { category_id: 7, parent_category_id: 5, name: "Y tế" },
        { category_id: 8, parent_category_id: 5, name: "Thuốc" },
        { category_id: 9, parent_category_id: null, name: "Đồng hồ" },
        { category_id: 10, parent_category_id: 9, name: "Đồng hồ nam" },
        { category_id: 11, parent_category_id: 9, name: "Đồng hồ nữ" },
        { category_id: 12, parent_category_id: null, name: "Xe" },
        { category_id: 13, parent_category_id: 12, name: "Xe đạp" },
        { category_id: 14, parent_category_id: null, name: "Máy ảnh & Phụ kiện" },
        { category_id: 15, parent_category_id: 14, name: "Máy ảnh" },
        { category_id: 16, parent_category_id: 14, name: "Ổng kính" },
    ];
};

export const generateMockProductImages = () => {
    return [...Array(r(4, 10))].map((_, index) => `https://picsum.photos/600?random=${index}`);
};
