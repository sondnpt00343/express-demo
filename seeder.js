require("module-alias/register");
const db = require("@/configs/db");
const { faker } = require("@faker-js/faker");

async function run() {
    try {
        console.log("Starting users seeder...");

        // Prepare bulk insert
        const records = 50; // Number of users to create
        let values = [];
        let placeholders = [];

        for (let i = 0; i < records; i++) {
            // Generate random user data
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const name = `${firstName} ${lastName}`;

            // Generate a unique username (lowercase with no spaces)
            const username = faker.internet
                .username({ firstName, lastName })
                .toLowerCase();

            // Generate unique email
            const email = faker.internet
                .email({ firstName, lastName })
                .toLowerCase();

            // Generate password (hashed in a real scenario)
            const password =
                "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"; // password = 'password'

            // Generate random birthday (18-80 years old)
            const birthday = faker.date.birthdate({
                min: 18,
                max: 80,
                mode: "age",
            });

            // Generate avatar URL (30% chance of having an avatar)
            const avatar = Math.random() > 0.7 ? faker.image.avatar() : null;

            // Generate phone with format +XXX-XXX-XXXX
            const phone = faker.helpers.fromRegExp(
                /\+[0-9]{3}-[0-9]{3}-[0-9]{4}/
            );

            // Random gender
            const genders = ["MALE", "FEMALE", "OTHER"];
            const gender = faker.helpers.arrayElement(genders);

            // Random relationship status
            const relStatuses = [
                "Single",
                "In a relationship",
                "Married",
                "Engaged",
                "It's complicated",
                null,
            ];
            const rel_status = faker.helpers.arrayElement(relStatuses);

            // Generate bio (70% chance of having a bio)
            const bio =
                Math.random() > 0.3
                    ? faker.lorem
                          .sentences({ min: 1, max: 3 })
                          .substring(0, 190)
                    : null;

            // Generate address (60% chance of having an address)
            const address =
                Math.random() > 0.4
                    ? faker.location
                          .streetAddress({ useFullAddress: true })
                          .substring(0, 190)
                    : null;

            // Random blocked status (5% chance of being blocked)
            const blocked_at =
                Math.random() > 0.95
                    ? formatDate(faker.date.recent({ days: 30 }))
                    : null;

            // Set created and updated dates
            const createdAt = faker.date.between({
                from: "2022-01-01T00:00:00.000Z",
                to: "2025-05-13T00:00:00.000Z",
            });

            // Updated date is either same as created or later
            const updatedAt =
                Math.random() > 0.7
                    ? faker.date.between({
                          from: createdAt,
                          to: "2025-05-13T00:00:00.000Z",
                      })
                    : createdAt;

            // Add to values array
            values.push(
                name,
                email,
                password,
                username,
                formatDate(birthday, true), // Date only format
                avatar,
                phone,
                gender,
                rel_status,
                bio,
                address,
                blocked_at,
                formatDate(createdAt),
                formatDate(updatedAt)
            );

            // Add placeholder for prepared statement
            placeholders.push("(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        }

        // Execute bulk insert
        const query = `
      INSERT INTO users (
        name, email, password, username, birthday, 
        avatar, phone, gender, rel_status, bio, 
        address, blocked_at, created_at, updated_at
      ) 
      VALUES ${placeholders.join(", ")}
    `;

        const result = await db.query(query, values);
        console.log(`Successfully seeded ${result.affectedRows} users`);
    } catch (error) {
        console.error("Error seeding users:", error);
    } finally {
        // Close database connection if needed
        process.exit(0);
    }
}

// Helper function to format date for MySQL
function formatDate(date, dateOnly = false) {
    if (!date) return null;

    if (dateOnly) {
        return date.toISOString().slice(0, 10);
    }

    return date.toISOString().slice(0, 19).replace("T", " ");
}

run();

/*
// Tính offset:
offset = (page - 1) * limit;

// Ví dụ query:
// select id, name, email, username, avatar, created_at from users order by created_at desc limit {limit} offset {offset};

// Gợi ý:
exports.findAll = async ({ page = 1, limit = 10 }) => {
    const offset = "...";
    const [rows] = await db.query("select * from users...");
    return rows;
};

exports.count = async () => {
    const [[{ total }]] = await db.query("select count(*) as total from users");
    return total;
}

// Luồng: Controller => Service (Xử lý logic) => Model (Lấy data từ DB và trả về)

Bài tập trên lớp: Phân trang API /api/v1/users?page=2
- Mỗi trang tải 10 records
- Mặc định tải trang 1, có thể thay đổi bằng param "page" (VD: ?page=2)
- Định dạng trả về:
{
    "success": true,
    "data": {
        "items": [...] // Danh sách users,
        "pagination": {
            "current_page": 1, // Trang hiện tại
            "per_page": 10, // Số bản ghi / trang
            "total": 200, // Tổng số bản ghi
            "last_page": 20, // Page cuối cùng
        }
    }
}
*Lưu ý: Những giá trị con số ở trên chỉ là giả định, cần trả về đúng với dữ liệu của bạn.
 */
