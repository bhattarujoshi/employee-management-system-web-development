/* ══════════════════════════════════════════
   WorkForce EMS — Data Store (data.js)
   ══════════════════════════════════════════ */

const DEPTS = ['Engineering', 'HR', 'Sales', 'Design', 'Marketing', 'Finance'];

const DEPT_COLORS = {
  Engineering: '#4f8ef7',
  HR:          '#22d3a5',
  Sales:       '#f97316',
  Design:      '#ec4899',
  Marketing:   '#f59e0b',
  Finance:     '#6366f1'
};

const DEPT_ICONS = {
  Engineering: '⚙️',
  HR:          '👥',
  Sales:       '📈',
  Design:      '🎨',
  Marketing:   '📣',
  Finance:     '💰'
};

const DEPT_BADGES = {
  Engineering: 'badge-eng',
  HR:          'badge-hr',
  Sales:       'badge-sales',
  Design:      'badge-design',
  Marketing:   'badge-mktg',
  Finance:     'badge-finance'
};

const AV_CLASSES = ['av1', 'av2', 'av3', 'av4', 'av5', 'av6'];

// ── EMPLOYEES ──
let employees = [
  { id:'EMP001', fname:'Alice',  lname:'Johnson',  email:'alice@workforce.com',  phone:'+1 555 1234', dept:'Engineering', role:'Senior Engineer',     salary:95000, date:'2021-03-15', status:'Active',   work:'On-Site', addr:'San Francisco, CA', notes:'Team lead candidate' },
  { id:'EMP002', fname:'Bob',    lname:'Chen',      email:'bob@workforce.com',    phone:'+1 555 2345', dept:'Engineering', role:'Backend Developer',   salary:82000, date:'2022-01-10', status:'Active',   work:'Remote',  addr:'Austin, TX',        notes:'' },
  { id:'EMP003', fname:'Clara',  lname:'Davis',     email:'clara@workforce.com',  phone:'+1 555 3456', dept:'HR',          role:'HR Manager',          salary:78000, date:'2020-07-20', status:'Active',   work:'On-Site', addr:'New York, NY',       notes:'' },
  { id:'EMP004', fname:'David',  lname:'Kim',       email:'david@workforce.com',  phone:'+1 555 4567', dept:'Sales',       role:'Sales Lead',          salary:88000, date:'2021-11-05', status:'Active',   work:'Hybrid',  addr:'Chicago, IL',        notes:'Top performer Q1' },
  { id:'EMP005', fname:'Eva',    lname:'Martinez',  email:'eva@workforce.com',    phone:'+1 555 5678', dept:'Design',      role:'UI/UX Designer',      salary:76000, date:'2022-06-01', status:'Active',   work:'Remote',  addr:'Seattle, WA',        notes:'' },
  { id:'EMP006', fname:'Frank',  lname:'Wilson',    email:'frank@workforce.com',  phone:'+1 555 6789', dept:'Finance',     role:'Financial Analyst',   salary:85000, date:'2021-09-12', status:'On Leave', work:'On-Site', addr:'Boston, MA',         notes:'Paternity leave' },
  { id:'EMP007', fname:'Grace',  lname:'Lee',       email:'grace@workforce.com',  phone:'+1 555 7890', dept:'Marketing',   role:'Marketing Manager',   salary:81000, date:'2020-12-01', status:'Active',   work:'Hybrid',  addr:'Los Angeles, CA',    notes:'' },
  { id:'EMP008', fname:'Henry',  lname:'Brown',     email:'henry@workforce.com',  phone:'+1 555 8901', dept:'Engineering', role:'Frontend Dev',        salary:79000, date:'2023-02-14', status:'Active',   work:'Remote',  addr:'Denver, CO',         notes:'' },
  { id:'EMP009', fname:'Iris',   lname:'Taylor',    email:'iris@workforce.com',   phone:'+1 555 9012', dept:'HR',          role:'Recruiter',           salary:62000, date:'2023-05-20', status:'Active',   work:'On-Site', addr:'Miami, FL',          notes:'' },
  { id:'EMP010', fname:'James',  lname:'Anderson',  email:'james@workforce.com',  phone:'+1 555 0123', dept:'Sales',       role:'Account Executive',   salary:72000, date:'2022-08-08', status:'On Leave', work:'On-Site', addr:'Phoenix, AZ',        notes:'' },
  { id:'EMP011', fname:'Karen',  lname:'White',     email:'karen@workforce.com',  phone:'+1 555 1122', dept:'Design',      role:'Graphic Designer',    salary:65000, date:'2023-01-09', status:'Active',   work:'Hybrid',  addr:'Portland, OR',       notes:'' },
  { id:'EMP012', fname:'Leo',    lname:'Harris',    email:'leo@workforce.com',    phone:'+1 555 2233', dept:'Finance',     role:'Accountant',          salary:71000, date:'2021-04-25', status:'Active',   work:'On-Site', addr:'Nashville, TN',      notes:'' },
  { id:'EMP013', fname:'Mia',    lname:'Clark',     email:'mia@workforce.com',    phone:'+1 555 3344', dept:'Engineering', role:'DevOps Engineer',     salary:91000, date:'2020-10-10', status:'Active',   work:'Remote',  addr:'San Jose, CA',       notes:'' },
  { id:'EMP014', fname:'Noah',   lname:'Lewis',     email:'noah@workforce.com',   phone:'+1 555 4455', dept:'Marketing',   role:'Content Strategist',  salary:67000, date:'2022-03-18', status:'Inactive', work:'Remote',  addr:'Atlanta, GA',        notes:'Contract ended' },
  { id:'EMP015', fname:'Olivia', lname:'Robinson',  email:'olivia@workforce.com', phone:'+1 555 5566', dept:'Sales',       role:'Sales Representative',salary:58000, date:'2023-07-01', status:'Active',   work:'On-Site', addr:'Houston, TX',        notes:'' },
];

// ── LEAVES ──
let leaves = [
  { id:1,  emp:'EMP006', name:'Frank Wilson',   type:'Annual Leave',           from:'2025-03-10', to:'2025-03-20', reason:'Family vacation',     status:'Approved' },
  { id:2,  emp:'EMP010', name:'James Anderson', type:'Sick Leave',             from:'2025-03-22', to:'2025-03-25', reason:'Medical procedure',   status:'Pending'  },
  { id:3,  emp:'EMP003', name:'Clara Davis',    type:'Emergency Leave',        from:'2025-03-24', to:'2025-03-24', reason:'Family emergency',    status:'Pending'  },
  { id:4,  emp:'EMP007', name:'Grace Lee',      type:'Annual Leave',           from:'2025-04-01', to:'2025-04-05', reason:'Spring holiday',      status:'Pending'  },
  { id:5,  emp:'EMP001', name:'Alice Johnson',  type:'Sick Leave',             from:'2025-02-14', to:'2025-02-15', reason:'Flu',                 status:'Approved' },
  { id:6,  emp:'EMP002', name:'Bob Chen',       type:'Annual Leave',           from:'2025-01-27', to:'2025-01-31', reason:'Vacation',            status:'Rejected' },
];

// ── ANNOUNCEMENTS ──
let announcements = [
  { id:1, title:'Q1 Town Hall Meeting',          cat:'Event',   body:'Join us for the Q1 all-hands on March 28 at 10 AM. Agenda includes company performance, roadmap, and Q&A.',                                              date:'2025-03-18', icon:'📣' },
  { id:2, title:'Updated Remote Work Policy',    cat:'Policy',  body:'Effective April 1st, all remote employees must complete a VPN setup verification. Details have been sent to your email.',                              date:'2025-03-15', icon:'📋' },
  { id:3, title:'Benefits Enrollment Open',      cat:'HR',      body:'Annual benefits enrollment is now open until March 31. Log into the HR portal to review and update your selections.',                                   date:'2025-03-10', icon:'💼' },
  { id:4, title:'Office Closure — Good Friday',  cat:'General', body:'The office will be closed on April 18th for Good Friday. Remote employees should plan accordingly.',                                                   date:'2025-03-08', icon:'🎉' },
];

// ── PERFORMANCES ──
let performances = [
  { emp:'EMP001', name:'Alice Johnson', dept:'Engineering', score:92, goals:95, rating:'Exceptional',          date:'2025-03-01', comments:'Outstanding leadership on the platform migration project.' },
  { emp:'EMP004', name:'David Kim',     dept:'Sales',       score:88, goals:91, rating:'Exceeds Expectations', date:'2025-03-05', comments:'Closed 3 enterprise deals this quarter.' },
  { emp:'EMP007', name:'Grace Lee',     dept:'Marketing',   score:78, goals:82, rating:'Meets Expectations',   date:'2025-03-08', comments:'Steady performance. Improved social media metrics.' },
  { emp:'EMP013', name:'Mia Clark',     dept:'Engineering', score:95, goals:98, rating:'Exceptional',          date:'2025-03-10', comments:'Reduced deployment time by 40%. Excellent work.' },
  { emp:'EMP003', name:'Clara Davis',   dept:'HR',          score:81, goals:85, rating:'Meets Expectations',   date:'2025-03-12', comments:'Hired 6 new engineers this quarter.' },
];

// ── DEPARTMENTS ──
let departments = [
  { name:'Engineering', manager:'Alice Johnson',  headcount:6, budget:500000, desc:'Builds and maintains all software products' },
  { name:'HR',          manager:'Clara Davis',    headcount:3, budget:150000, desc:'Recruitment, onboarding and employee relations' },
  { name:'Sales',       manager:'David Kim',      headcount:4, budget:200000, desc:'Revenue generation and client management' },
  { name:'Design',      manager:'Eva Martinez',   headcount:3, budget:120000, desc:'Product and brand design' },
  { name:'Marketing',   manager:'Grace Lee',      headcount:3, budget:180000, desc:'Brand awareness and demand generation' },
  { name:'Finance',     manager:'Leo Harris',     headcount:2, budget:100000, desc:'Financial planning and reporting' },
];
