import { PrismaClient, UserRole, LeaveType, LeaveStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // ----------------------
  // Departments
  // ----------------------
  const departments = await Promise.all([
    prisma.department.upsert({
      where: { name: 'Engineering' },
      update: {},
      create: {
        name: 'Engineering',
        description: 'Software development and technical operations',
      },
    }),
    prisma.department.upsert({
      where: { name: 'Human Resources' },
      update: {},
      create: {
        name: 'Human Resources',
        description: 'HR operations and employee management',
      },
    }),
    prisma.department.upsert({
      where: { name: 'Marketing' },
      update: {},
      create: {
        name: 'Marketing',
        description: 'Marketing and brand management',
      },
    }),
    prisma.department.upsert({
      where: { name: 'Sales' },
      update: {},
      create: {
        name: 'Sales',
        description: 'Sales and business development',
      },
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
        maxConsecutiveDays: 3,
        minDaysNotice: 1,
        requiresApproval: true,
        requiresDocument: false,
        carryForwardAllowed: true,
        maxCarryForward: 5,
      },
    }),
    prisma.leavePolicy.upsert({
      where: { leaveType: LeaveType.VACATION },
      update: {},
      create: {
        leaveType: LeaveType.VACATION,
        annualQuota: 20,
        maxConsecutiveDays: 10,
        minDaysNotice: 7,
        requiresApproval: true,
        requiresDocument: false,
        carryForwardAllowed: true,
        maxCarryForward: 10,
      },
    }),
    prisma.leavePolicy.upsert({
      where: { leaveType: LeaveType.ACADEMIC },
      update: {},
      create: {
        leaveType: LeaveType.ACADEMIC,
        annualQuota: 5,
        maxConsecutiveDays: 2,
        minDaysNotice: 3,
        requiresApproval: true,
        requiresDocument: true,
        carryForwardAllowed: false,
      },
    }),
    prisma.leavePolicy.upsert({
      where: { leaveType: LeaveType.COMP_OFF },
      update: {},
      create: {
        leaveType: LeaveType.COMP_OFF,
        annualQuota: 12,
        maxConsecutiveDays: 2,
        minDaysNotice: 1,
        requiresApproval: true,
        requiresDocument: false,
        carryForwardAllowed: true,
        maxCarryForward: 6,
      },
    }),
    prisma.leavePolicy.upsert({
      where: { leaveType: LeaveType.WFH },
      update: {},
      create: {
        leaveType: LeaveType.WFH,
        annualQuota: 50,
        maxConsecutiveDays: 5,
        minDaysNotice: 1,
        requiresApproval: true,
        requiresDocument: false,
        carryForwardAllowed: false,
      },
    }),
  ]);
  console.log('✅ Created/Upserted leave policies');

  // ----------------------
  // Users (your emails)
  // ----------------------
  const hashedPassword = await bcrypt.hash('Password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'jatothadithyanaik@gmail.com' },
    update: {},
    create: {
      email: 'jatothadithyanaik@gmail.com',
      username: 'adminuser',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      employeeId: 'EMP001',
      role: UserRole.ADMIN,
      departmentId: departments[1].id, // HR
      joinDate: new Date('2020-01-01'),
      isActive: true, 
    },
  });

  const hr = await prisma.user.upsert({
    where: { email: 'adithyanaikaj@gmail.com' },
    update: {},
    create: {
      email: 'adithyanaikaj@gmail.com',
      username: 'hrmanager',
      password: hashedPassword,
      firstName: 'HR',
      lastName: 'Manager',
      employeeId: 'EMP002',
      role: UserRole.HR,
      departmentId: departments[1].id,
      joinDate: new Date('2020-06-01'),
      isActive: true, 
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'adithyaj219@gmail.com' },
    update: {},
    create: {
      email: 'adithyaj219@gmail.com',
      username: 'manager1',
      password: hashedPassword,
      firstName: 'Manager',
      lastName: 'One',
      employeeId: 'EMP003',
      role: UserRole.MANAGER,
      departmentId: departments[0].id,
      joinDate: new Date('2021-01-15'),
      isActive: true, 
    },
  });

  const employee = await prisma.user.upsert({
    where: { email: 'idbhosting@gmail.com' },
    update: {},
    create: {
      email: 'idbhosting@gmail.com',
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
    },
  });

  console.log('✅ Created/Upserted your 4 main users');

  // ----------------------
  // Holidays
  // ----------------------
  const currentYear = new Date().getFullYear();
  await Promise.all([
    prisma.holiday.upsert({
      where: { name: "New Year's Day" },
      update: {},
      create: {
        name: "New Year's Day",
        date: new Date(`${currentYear}-01-01`),
        description: 'New Year celebration',
        isRecurring: true,
      },
    }),
    prisma.holiday.upsert({
      where: { name: 'Independence Day' },
      update: {},
      create: {
        name: 'Independence Day',
        date: new Date(`${currentYear}-07-04`),
        description: 'Independence Day celebration',
        isRecurring: true,
      },
    }),
  ]);
  console.log('✅ Created/Upserted holidays');

  // ----------------------
  // Leave balances (for the 4 users only)
  // ----------------------
  const allUsers = [admin, hr, manager, employee];

  for (const user of allUsers) {
    for (const policy of leavePolicies) {
      await prisma.leaveBalance.upsert({
        where: {
          userId_leavePolicyId_year: {
            userId: user.id,
            leavePolicyId: policy.id,
            year: currentYear,
          },
        },
        update: {},
        create: {
          userId: user.id,
          leavePolicyId: policy.id,
          year: currentYear,
          totalQuota: policy.annualQuota,
          usedDays: 0,
          pendingDays: 0,
          availableDays: policy.annualQuota,
          carryForward: 0,
        },
      });
    }
  }
  console.log('✅ Created/Upserted leave balances for users');

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
