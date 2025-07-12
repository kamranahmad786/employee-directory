// Main Application Class
class EmployeeDirectory {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.filteredEmployees = [...employees];
        this.editingEmployee = null;
        this.searchTerm = '';
        this.departmentFilter = '';
        this.roleFilter = '';
        this.sortBy = 'firstName';
        this.sortOrder = 'asc';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // Filter functionality
        document.getElementById('departmentFilter').addEventListener('change', (e) => {
            this.departmentFilter = e.target.value;
            this.applyFilters();
        });

        document.getElementById('roleFilter').addEventListener('change', (e) => {
            this.roleFilter = e.target.value;
            this.applyFilters();
        });

        // Sort functionality
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            const [field, order] = e.target.value.split('-');
            this.sortBy = field;
            this.sortOrder = order;
            this.applyFilters();
        });

        // Items per page
        document.getElementById('itemsPerPage').addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.render();
        });

        // Pagination
        document.getElementById('prevBtn').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.render();
            }
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.render();
            }
        });

        // Add employee
        document.getElementById('addEmployeeBtn').addEventListener('click', () => {
            this.openModal();
        });

        // Modal events
        document.getElementById('employeeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEmployee();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModal();
        });

        // Delete confirmation
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            this.confirmDelete();
        });

        document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
            this.closeDeleteModal();
        });

        // Close modal on X click
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                modal.style.display = 'none';
            });
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Real-time validation
        this.setupRealTimeValidation();
    }

    setupRealTimeValidation() {
        const inputs = ['firstName', 'lastName', 'email', 'department', 'role'];
        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            input.addEventListener('blur', () => {
                this.validateSingleField(inputId, input.value);
            });
            input.addEventListener('input', () => {
                // Clear error on input
                const errorElement = document.getElementById(`${inputId}Error`);
                if (errorElement.textContent) {
                    errorElement.textContent = '';
                    input.classList.remove('error');
                }
            });
        });
    }

    validateSingleField(fieldName, value) {
        let error = '';
        
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (!ValidationManager.validateRequired(value)) {
                    error = `${fieldName === 'firstName' ? 'First' : 'Last'} name is required`;
                } else if (!ValidationManager.validateName(value)) {
                    error = `${fieldName === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters and contain only letters`;
                }
                break;
            case 'email':
                if (!ValidationManager.validateRequired(value)) {
                    error = 'Email is required';
                } else if (!ValidationManager.validateEmail(value)) {
                    error = 'Please enter a valid email address';
                } else if (this.isEmailDuplicate(value)) {
                    error = 'This email is already in use';
                }
                break;
            case 'department':
                if (!ValidationManager.validateRequired(value)) {
                    error = 'Department is required';
                }
                break;
            case 'role':
                if (!ValidationManager.validateRequired(value)) {
                    error = 'Role is required';
                }
                break;
        }

        const errorElement = document.getElementById(`${fieldName}Error`);
        const inputElement = document.getElementById(fieldName);
        
        if (error) {
            errorElement.textContent = error;
            inputElement.classList.add('error');
        } else {
            errorElement.textContent = '';
            inputElement.classList.remove('error');
        }
    }

    isEmailDuplicate(email) {
        return employees.some(emp => 
            emp.email.toLowerCase() === email.toLowerCase() && 
            (!this.editingEmployee || emp.id !== this.editingEmployee.id)
        );
    }

    applyFilters() {
        this.filteredEmployees = employees.filter(employee => {
            // Search filter
            const matchesSearch = !this.searchTerm || 
                employee.firstName.toLowerCase().includes(this.searchTerm) ||
                employee.lastName.toLowerCase().includes(this.searchTerm) ||
                employee.email.toLowerCase().includes(this.searchTerm);

            // Department filter
            const matchesDepartment = !this.departmentFilter || 
                employee.department === this.departmentFilter;

            // Role filter
            const matchesRole = !this.roleFilter || 
                employee.role === this.roleFilter;

            return matchesSearch && matchesDepartment && matchesRole;
        });

        // Apply sorting
        this.filteredEmployees.sort((a, b) => {
            let aValue = a[this.sortBy].toLowerCase();
            let bValue = b[this.sortBy].toLowerCase();

            if (this.sortOrder === 'desc') {
                [aValue, bValue] = [bValue, aValue];
            }

            return aValue.localeCompare(bValue);
        });

        this.currentPage = 1;
        this.render();
    }

    render() {
        this.renderEmployees();
        this.renderPagination();
    }

    renderEmployees() {
        const grid = document.getElementById('employeeGrid');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageEmployees = this.filteredEmployees.slice(startIndex, endIndex);

        if (pageEmployees.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <h3>No employees found</h3>
                    <p>Try adjusting your search criteria or add a new employee.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = pageEmployees.map(employee => `
            <div class="employee-card" data-id="${employee.id}">
                <div class="employee-info">
                    <h3>${employee.firstName} ${employee.lastName}</h3>
                    <p class="employee-id"><strong>ID:</strong> ${employee.id}</p>
                    <p class="employee-email"><strong>Email:</strong> ${employee.email}</p>
                    <p><strong>Department:</strong> ${employee.department}</p>
                    <p><strong>Role:</strong> ${employee.role}</p>
                </div>
                <div class="employee-actions">
                    <button class="btn-edit" onclick="app.editEmployee('${employee.id}')">Edit</button>
                    <button class="btn-delete" onclick="app.deleteEmployee('${employee.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }

    renderPagination() {
        const totalEmployees = this.filteredEmployees.length;
        const totalPages = Math.ceil(totalEmployees / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endIndex = Math.min(startIndex + this.itemsPerPage - 1, totalEmployees);

        // Update pagination info
        document.getElementById('paginationInfo').textContent = 
            `Showing ${startIndex}-${endIndex} of ${totalEmployees} employees`;

        // Update pagination buttons
        document.getElementById('prevBtn').disabled = this.currentPage === 1;
        document.getElementById('nextBtn').disabled = this.currentPage === totalPages;

        // Render page numbers
        this.renderPageNumbers(totalPages);
    }

    renderPageNumbers(totalPages) {
        const pageNumbersContainer = document.getElementById('pageNumbers');
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        let pageNumbersHTML = '';

        for (let i = startPage; i <= endPage; i++) {
            pageNumbersHTML += `
                <button class="page-number ${i === this.currentPage ? 'active' : ''}" 
                        onclick="app.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        pageNumbersContainer.innerHTML = pageNumbersHTML;
    }

    goToPage(page) {
        this.currentPage = page;
        this.render();
    }

    openModal(employee = null) {
        this.editingEmployee = employee;
        const modal = document.getElementById('employeeModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('employeeForm');

        if (employee) {
            modalTitle.textContent = 'Edit Employee';
            document.getElementById('firstName').value = employee.firstName;
            document.getElementById('lastName').value = employee.lastName;
            document.getElementById('email').value = employee.email;
            document.getElementById('department').value = employee.department;
            document.getElementById('role').value = employee.role;
        } else {
            modalTitle.textContent = 'Add Employee';
            form.reset();
        }

        ValidationManager.clearErrors();
        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('employeeModal').style.display = 'none';
        this.editingEmployee = null;
        ValidationManager.clearErrors();
    }

    saveEmployee() {
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            department: document.getElementById('department').value,
            role: document.getElementById('role').value
        };

        const errors = ValidationManager.validateForm(formData);
        
        // Check for email duplicates
        if (!errors.email && this.isEmailDuplicate(formData.email)) {
            errors.email = 'This email is already in use';
        }

        if (Object.keys(errors).length > 0) {
            ValidationManager.displayErrors(errors);
            return;
        }

        if (this.editingEmployee) {
            // Update existing employee
            const index = employees.findIndex(emp => emp.id === this.editingEmployee.id);
            if (index !== -1) {
                employees[index] = { ...employees[index], ...formData };
            }
        } else {
            // Add new employee
            const newEmployee = {
                id: generateEmployeeId(),
                ...formData
            };
            employees.push(newEmployee);
        }

        this.closeModal();
        this.applyFilters();
    }

    editEmployee(id) {
        const employee = employees.find(emp => emp.id === id);
        if (employee) {
            this.openModal(employee);
        }
    }

    deleteEmployee(id) {
        this.employeeToDelete = id;
        document.getElementById('deleteModal').style.display = 'block';
    }

    confirmDelete() {
        if (this.employeeToDelete) {
            employees = employees.filter(emp => emp.id !== this.employeeToDelete);
            this.employeeToDelete = null;
            this.closeDeleteModal();
            this.applyFilters();
        }
    }

    closeDeleteModal() {
        document.getElementById('deleteModal').style.display = 'none';
        this.employeeToDelete = null;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EmployeeDirectory();
});