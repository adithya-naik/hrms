// prisma/seed.ts
import { PrismaClient, UserRole, LeaveType, TaskPriority, TaskStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // JS months are 0-indexed
  const nextMonthReset = new Date(currentYear, currentMonth, 1); // first day of next month

  // ----------------------
  // Departments
  // ----------------------
  const departments = await Promise.all([
    prisma.department.upsert({
      where: { name: 'Engineering' },
      update: {},
      create: { name: 'Engineering', description: 'Software development and technical operations' },
    }),
    prisma.department.upsert({
      where: { name: 'Human Resources' },
      update: {},
      create: { name: 'Human Resources', description: 'HR operations and employee management' },
    }),
    prisma.department.upsert({
      where: { name: 'Marketing' },
      update: {},
      create: { name: 'Marketing', description: 'Marketing and brand management' },
    }),
    prisma.department.upsert({
      where: { name: 'Sales' },
      update: {},
      create: { name: 'Sales', description: 'Sales and business development' },
    }),
  ]);
  console.log('✅ Created/Upserted departments');

  // ----------------------
  // Leave Policies
  // ----------------------
  const leavePolicies = await Promise.all([
    prisma.leavePolicy.upsert({
      where: { leaveType: LeaveType.SICK },
      update: {},
      create: {
        leaveType: LeaveType.SICK,
        annualQuota: 12,
        monthlyQuota: 1,
        quotaResetDay: 1,
        maxConsecutiveDays: 5,
        minDaysNotice: 0,
        requiresApproval: true,
        requiresDocument: true,
        carryForwardAllowed: false,
      },
    }),
    prisma.leavePolicy.upsert({
      where: { leaveType: LeaveType.CASUAL },
      update: {},
      create: {
        leaveType: LeaveType.CASUAL,
        annualQuota: 15,
        monthlyQuota: 2,
        quotaResetDay: 1,
        maxConsecutiveDays: 3,
        minDaysNotice: 3,
        requiresApproval: true,
        requiresDocument: false,
        carryForwardAllowed: true,
        maxCarryForward: 5,
      },
    }),
    prisma.leavePolicy.upsert({
      where: { leaveType: LeaveType.LOP },
      update: {},
      create: {
        leaveType: LeaveType.LOP,
        annualQuota: 5,
        monthlyQuota: 1,
        quotaResetDay: 1,
        maxConsecutiveDays: 2,
        minDaysNotice: 3,
        requiresApproval: true,
        requiresDocument: false,
        carryForwardAllowed: true,
      },
    }),
  ]);
  console.log('✅ Created/Upserted leave policies');

  // ----------------------
  // Helper function to safely upsert user by email
  // ----------------------
  async function safeUpsertUser(email: string, employeeId: string, data: any) {
    await prisma.user.deleteMany({
      where: {
        employeeId,
        NOT: { email },
      },
    });

    return prisma.user.upsert({
      where: { email },
      update: data,
      create: { email, ...data },
    });
  }

  // ----------------------
  // Users
  // ----------------------
  const hashedPassword = await bcrypt.hash('Password123', 10);

  const admin = await safeUpsertUser('nareshsirvi726@gmail.com', 'EMP001', {
    username: 'adminuser',
    password: hashedPassword,
    firstName: 'Admin',
    lastName: 'User',
    employeeId: 'EMP001',
    role: UserRole.ADMIN,
    departmentId: departments[1].id,
    joinDate: new Date('2020-01-01'),
    isActive: true,
  });

  const hr = await safeUpsertUser('nareshsirvi604@gmail.com', 'EMP002', {
    username: 'hrmanager',
    password: hashedPassword,
    firstName: 'HR',
    lastName: 'Manager',
    employeeId: 'EMP002',
    role: UserRole.HR,
    departmentId: departments[1].id,
    joinDate: new Date('2020-06-01'),
    isActive: true,
  });

  const manager = await safeUpsertUser('dollyavula09@gmail.com', 'EMP003', {
    username: 'manager1',
    password: hashedPassword,
    firstName: 'Manager',
    lastName: 'One',
    employeeId: 'EMP003',
    role: UserRole.MANAGER,
    departmentId: departments[0].id,
    joinDate: new Date('2021-01-15'),
    isActive: true,
  });

  const employee = await safeUpsertUser('dolly75rohi@gmail.com', 'EMP004', {
    username: 'employee1',
    password: hashedPassword,
    firstName: 'Employee',
    lastName: 'One',
    employeeId: 'EMP004',
    role: UserRole.EMPLOYEE,
    managerId: manager.id,
    departmentId: departments[0].id,
    joinDate: new Date('2021-03-01'),
    isActive: true,
  });

  console.log('✅ Created/Upserted 4 main users');

  // ----------------------
  // Holidays
  // ----------------------
  await Promise.all([
    prisma.holiday.upsert({
      where: { name: "New Year's Day" },
      update: {},
      create: { name: "New Year's Day", date: new Date(`${currentYear}-01-01`), description: 'New Year celebration', isRecurring: true },
    }),
    prisma.holiday.upsert({
      where: { name: 'Independence Day' },
      update: {},
      create: { name: 'Independence Day', date: new Date(`${currentYear}-07-04`), description: 'Independence Day celebration', isRecurring: true },
    }),
  ]);
  console.log('✅ Created/Upserted holidays');

  // ----------------------
  // Project Management (Project → Module → Task)
  // ----------------------
  const project = await prisma.project.upsert({
    where: { projectName: 'HRMS Development' },
    update: {},
    create: {
      projectName: 'HRMS Development',
      clientName: 'ABC Corp',
      revenue: 50000,
      priority: 'HIGH',
      allocatedHours: 200,
      managerId: manager.id,
      description: 'Building HRMS portal',
    },
  });

  const module = await prisma.module.upsert({
    where: { name: 'Leave Management' },
    update: {},
    create: { name: 'Leave Management', projectId: project.id },
  });

  await prisma.task.upsert({
    where: { name: 'Build Leave Balance API' },
    update: {},
    create: {
      name: 'Build Leave Balance API',
      description: 'Implement API for leave balance',
      allocatedHrs: 10,
      priority: TaskPriority.HIGH,
      status: TaskStatus.PENDING,
      moduleId: module.id,
      assignedToId: employee.id,
    },
  });

  console.log('✅ Created/Upserted project, module, and task');

  // ----------------------
  // Leave balances
  // ----------------------
  const allUsers = [admin, hr, manager, employee];
  for (const user of allUsers) {
    for (const policy of leavePolicies) {
      await prisma.leaveBalance.upsert({
        where: { userId_leavePolicyId_year_month: { userId: user.id, leavePolicyId: policy.id, year: currentYear, month: currentMonth } },
        update: {},
        create: {
          userId: user.id,
          leavePolicyId: policy.id,
          year: currentYear,
          month: currentMonth,
          totalQuota: policy.annualQuota,
          usedDays: 0,
          pendingDays: 0,
          availableDays: policy.annualQuota,
          carryForward: 0,
          resetDate: nextMonthReset,
        },
      });
    }
  }

  console.log('✅ Created/Upserted leave balances for all users');
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
