export default function generateStoreID() {
    const prefix = "STORE";
    const randomString = Math.random().toString(36).substr(2, 6).toUpperCase();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    return `${prefix}-${randomNumber}${randomString}`;
}

// function generateStoreID() {
//     const prefix = "STORE";
//     const timestamp = Date.now().toString(36).toUpperCase(); // Unique part based on time
//     const randomString = Math.random().toString(36).substr(2, 5).toUpperCase();

//     return `${prefix}-${timestamp}${randomString}`;
// }