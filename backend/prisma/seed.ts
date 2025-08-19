import { PrismaClient, UserRole, LeaveType, LeaveStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // ----------------------
  // Create departments
  // ----------------------
  const departments = await Promise.all([
    prisma.department.create({
      data: {
        name: 'Engineering',
        description: 'Software development and technical operations',
      },
    }),
    prisma.department.create({
      data: {
        name: 'Human Resources',
        description: 'HR operations and employee management',
      },
    }),
    prisma.department.create({
      data: {
        name: 'Marketing',
        description: 'Marketing and brand management',
      },
    }),
    prisma.department.create({
      data: {
        name: 'Sales',
        description: 'Sales and business development',
      },
    }),
  ]);

  console.log('✅ Created departments');

  // ----------------------
  // Create leave policies
  // ----------------------
  const leavePolicies = await Promise.all([
    prisma.leavePolicy.create({
      data: {
        leaveType: LeaveType.SICK,
        annualQuota: 12,
        maxConsecutiveDays: 5,
        minDaysNotice: 0,
        requiresApproval: true,
        requiresDocument: true,
        carryForwardAllowed: false,
      },
    }),
    prisma.leavePolicy.create({
      data: {
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
    prisma.leavePolicy.create({
      data: {
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
    prisma.leavePolicy.create({
      data: {
        leaveType: LeaveType.ACADEMIC,
        annualQuota: 5,
        maxConsecutiveDays: 2,
        minDaysNotice: 3,
        requiresApproval: true,
        requiresDocument: true,
        carryForwardAllowed: false,
      },
    }),
    prisma.leavePolicy.create({
      data: {
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
    prisma.leavePolicy.create({
      data: {
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

  console.log('✅ Created leave policies');

  // ----------------------
  // Create sample users
  // ----------------------
  const admin = await prisma.user.create({
    data: {
      auth0Id: 'auth0|admin123',
      email: 'admin@company.com',
      firstName: 'Admin',
      lastName: 'User',
      employeeId: 'EMP001',
      role: UserRole.ADMIN,
      departmentId: departments[1].id, // HR
      joinDate: new Date('2020-01-01'),
    },
  });

  const hrManager = await prisma.user.create({
    data: {
      auth0Id: 'auth0|hr123',
      email: 'hr@company.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      employeeId: 'EMP002',
      role: UserRole.HR,
      departmentId: departments[1].id, // HR
      joinDate: new Date('2020-06-01'),
    },
  });

  const engineeringManager = await prisma.user.create({
    data: {
      auth0Id: 'auth0|mgr123',
      email: 'manager@company.com',
      firstName: 'John',
      lastName: 'Smith',
      employeeId: 'EMP003',
      role: UserRole.MANAGER,
      departmentId: departments[0].id, // Engineering
      joinDate: new Date('2021-01-15'),
    },
  });

  const employees = await Promise.all([
    prisma.user.create({
      data: {
        auth0Id: 'auth0|emp123',
        email: 'employee1@company.com',
        firstName: 'Alice',
        lastName: 'Brown',
        employeeId: 'EMP004',
        role: UserRole.EMPLOYEE,
        managerId: engineeringManager.id,
        departmentId: departments[0].id, // Engineering
        joinDate: new Date('2021-03-01'),
      },
    }),
    prisma.user.create({
      data: {
        auth0Id: 'auth0|emp456',
        email: 'employee2@company.com',
        firstName: 'Bob',
        lastName: 'Wilson',
        employeeId: 'EMP005',
        role: UserRole.EMPLOYEE,
        managerId: engineeringManager.id,
        departmentId: departments[0].id, // Engineering
        joinDate: new Date('2021-05-15'),
      },
    }),
    prisma.user.create({
      data: {
        auth0Id: 'auth0|emp789',
        email: 'employee3@company.com',
        firstName: 'Carol',
        lastName: 'Davis',
        employeeId: 'EMP006',
        role: UserRole.EMPLOYEE,
        departmentId: departments[2].id, // Marketing
        joinDate: new Date('2021-08-01'),
      },
    }),
  ]);

  console.log('✅ Created sample users');

  // ----------------------
  // Create leave balances for all users
  // ----------------------
  const currentYear = new Date().getFullYear();
  const allUsers = [admin, hrManager, engineeringManager, ...employees];

  for (const user of allUsers) {
    for (const policy of leavePolicies) {
      await prisma.leaveBalance.create({
        data: {
          userId: user.id,
          leavePolicyId: policy.id, // updated
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

  console.log('✅ Created leave balances');

  // ----------------------
  // Create sample holidays
  // ----------------------
  const holidays = await Promise.all([
    prisma.holiday.create({
      data: {
        name: "New Year's Day",
        date: new Date(`${currentYear}-01-01`),
        description: 'New Year celebration',
        isRecurring: true,
      },
    }),
    prisma.holiday.create({
      data: {
        name: 'Independence Day',
        date: new Date(`${currentYear}-07-04`),
        description: 'Independence Day celebration',
        isRecurring: true,
      },
    }),
    prisma.holiday.create({
      data: {
        name: 'Christmas Day',
        date: new Date(`${currentYear}-12-25`),
        description: 'Christmas celebration',
        isRecurring: true,
      },
    }),
    prisma.holiday.create({
      data: {
        name: 'Thanksgiving',
        date: new Date(`${currentYear}-11-24`),
        description: 'Thanksgiving holiday',
        isRecurring: true,
      },
    }),
  ]);

  console.log('✅ Created holidays');

  // ----------------------
  // Create sample leave requests
  // ----------------------
  const sampleLeaves = await Promise.all([
    prisma.leave.create({
      data: {
        requesterId: employees[0].id,
        leaveType: LeaveType.VACATION,
        startDate: new Date(`${currentYear}-12-20`),
        endDate: new Date(`${currentYear}-12-22`),
        totalDays: 3,
        reason: 'Family vacation for Christmas',
        status: LeaveStatus.PENDING,
      },
    }),
    prisma.leave.create({
      data: {
        requesterId: employees[1].id,
        approverId: engineeringManager.id,
        leaveType: LeaveType.SICK,
        startDate: new Date(`${currentYear}-11-15`),
        endDate: new Date(`${currentYear}-11-16`),
        totalDays: 2,
        reason: 'Flu symptoms',
        status: LeaveStatus.APPROVED,
        approvedDate: new Date(),
      },
    }),
  ]);

  console.log('✅ Created sample leave requests');

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`- ${departments.length} departments created`);
  console.log(`- ${leavePolicies.length} leave policies created`);
  console.log(`- ${allUsers.length} users created`);
  console.log(`- ${allUsers.length * leavePolicies.length} leave balances created`);
  console.log(`- ${holidays.length} holidays created`);
  console.log(`- ${sampleLeaves.length} sample leave requests created`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
