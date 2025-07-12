// Mock employee data
const initialEmployees = [
    {
        id: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@company.com",
        department: "Engineering",
        role: "Manager"
    },
    {
        id: "EMP002",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@company.com",
        department: "Marketing",
        role: "Developer"
    },
    {
        id: "EMP003",
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael.johnson@company.com",
        department: "Sales",
        role: "Analyst"
    },
    {
        id: "EMP004",
        firstName: "Emily",
        lastName: "Brown",
        email: "emily.brown@company.com",
        department: "HR",
        role: "Manager"
    },
    {
        id: "EMP005",
        firstName: "David",
        lastName: "Wilson",
        email: "david.wilson@company.com",
        department: "Finance",
        role: "Developer"
    },
    {
        id: "EMP006",
        firstName: "Sarah",
        lastName: "Davis",
        email: "sarah.davis@company.com",
        department: "Engineering",
        role: "Designer"
    },
    {
        id: "EMP007",
        firstName: "Robert",
        lastName: "Miller",
        email: "robert.miller@company.com",
        department: "Marketing",
        role: "Analyst"
    },
    {
        id: "EMP008",
        firstName: "Lisa",
        lastName: "Garcia",
        email: "lisa.garcia@company.com",
        department: "Sales",
        role: "Manager"
    },
    {
        id: "EMP009",
        firstName: "James",
        lastName: "Martinez",
        email: "james.martinez@company.com",
        department: "HR",
        role: "Developer"
    },
    {
        id: "EMP010",
        firstName: "Mary",
        lastName: "Anderson",
        email: "mary.anderson@company.com",
        department: "Finance",
        role: "Designer"
    },
    {
        id: "EMP011",
        firstName: "Christopher",
        lastName: "Taylor",
        email: "christopher.taylor@company.com",
        department: "Engineering",
        role: "Intern"
    },
    {
        id: "EMP012",
        firstName: "Patricia",
        lastName: "Thomas",
        email: "patricia.thomas@company.com",
        department: "Marketing",
        role: "Manager"
    },
    {
        id: "EMP013",
        firstName: "Daniel",
        lastName: "Jackson",
        email: "daniel.jackson@company.com",
        department: "Sales",
        role: "Developer"
    },
    {
        id: "EMP014",
        firstName: "Jennifer",
        lastName: "White",
        email: "jennifer.white@company.com",
        department: "HR",
        role: "Analyst"
    },
    {
        id: "EMP015",
        firstName: "Matthew",
        lastName: "Harris",
        email: "matthew.harris@company.com",
        department: "Finance",
        role: "Designer"
    },
    {
        id: "EMP016",
        firstName: "Elizabeth",
        lastName: "Martin",
        email: "elizabeth.martin@company.com",
        department: "Engineering",
        role: "Manager"
    },
    {
        id: "EMP017",
        firstName: "Anthony",
        lastName: "Thompson",
        email: "anthony.thompson@company.com",
        department: "Marketing",
        role: "Developer"
    },
    {
        id: "EMP018",
        firstName: "Susan",
        lastName: "Garcia",
        email: "susan.garcia@company.com",
        department: "Sales",
        role: "Analyst"
    },
    {
        id: "EMP019",
        firstName: "Joseph",
        lastName: "Martinez",
        email: "joseph.martinez@company.com",
        department: "HR",
        role: "Designer"
    },
    {
        id: "EMP020",
        firstName: "Karen",
        lastName: "Robinson",
        email: "karen.robinson@company.com",
        department: "Finance",
        role: "Intern"
    }
];

// Generate unique ID for new employees
function generateEmployeeId() {
    const existingIds = employees.map(emp => emp.id);
    let newId = 1;
    while (existingIds.includes(`EMP${newId.toString().padStart(3, '0')}`)) {
        newId++;
    }
    return `EMP${newId.toString().padStart(3, '0')}`;
}

// Initialize employees array
let employees = [...initialEmployees];