export const CATEGORIES = [
  { id: 'baby',     label: 'Baby & Family',       icon: '🍼', color: '#C8956C' },
  { id: 'health',   label: 'Health & Fitness',     icon: '💪', color: '#6B8F6B' },
  { id: 'home',     label: 'Home & Errands',        icon: '🏡', color: '#8B7355' },
  { id: 'personal', label: 'Personal Development',  icon: '🌱', color: '#5B7FA6' },
]

export const LEAVE_START = new Date(2026, 1, 23) // Feb 23 2026

export const DEFAULT_ITEMS = [
  // Baby & Family
  { id: 'b1',  categoryId: 'baby',     text: '2-week pediatrician visit',                                 isCompleted: true  },
  { id: 'b2',  categoryId: 'baby',     text: '1-month pediatrician visit',                                isCompleted: true  },
  { id: 'b3',  categoryId: 'baby',     text: '2-month pediatrician visit + vaccines',                     isCompleted: true  },
  { id: 'b4',  categoryId: 'baby',     text: 'Schedule 4-month pediatrician visit',                       isCompleted: false },
  { id: 'b5',  categoryId: 'baby',     text: 'Research sleep training methods (4–6 month window)',        isCompleted: false },
  { id: 'b6',  categoryId: 'baby',     text: 'Establish daily tummy time routine',                        isCompleted: false },
  { id: 'b7',  categoryId: 'baby',     text: 'Begin reading aloud together each day',                     isCompleted: false },
  { id: 'b8',  categoryId: 'baby',     text: 'Set up baby photo backup system (iCloud/Google Photos)',    isCompleted: false },
  { id: 'b9',  categoryId: 'baby',     text: 'Create a baby memory book or journal',                      isCompleted: false },
  { id: 'b10', categoryId: 'baby',     text: 'Add baby as beneficiary on life insurance & accounts',      isCompleted: false },
  { id: 'b11', categoryId: 'baby',     text: 'File for Social Security card (if not done)',                isCompleted: false },
  { id: 'b12', categoryId: 'baby',     text: 'Confirm baby is on health insurance',                       isCompleted: false },
  // Health & Fitness
  { id: 'h1',  categoryId: 'health',   text: 'Schedule urology/sports med follow-up for groin pain',     isCompleted: false },
  { id: 'h2',  categoryId: 'health',   text: 'Get a full annual physical while you have time',            isCompleted: false },
  { id: 'h3',  categoryId: 'health',   text: 'Get bloodwork done (metabolic panel, testosterone, etc.)',  isCompleted: false },
  { id: 'h4',  categoryId: 'health',   text: 'Schedule dentist appointment',                              isCompleted: false },
  { id: 'h5',  categoryId: 'health',   text: 'Get eyes checked',                                         isCompleted: false },
  { id: 'h6',  categoryId: 'health',   text: 'Get outside with baby daily — walk, fresh air',            isCompleted: false },
  { id: 'h7',  categoryId: 'health',   text: "Rebuild workout routine gradually around baby's schedule", isCompleted: false },
  { id: 'h8',  categoryId: 'health',   text: 'Audit and restock supplements',                             isCompleted: false },
  { id: 'h9',  categoryId: 'health',   text: 'Prioritize sleep every chance you get',                     isCompleted: false },
  // Home & Errands
  { id: 'o1',  categoryId: 'home',     text: 'Fix Traeger ignition issue',                                isCompleted: false },
  { id: 'o2',  categoryId: 'home',     text: 'Start baby-proofing research (crawling is ~3–4 months away)', isCompleted: false },
  { id: 'o3',  categoryId: 'home',     text: 'Update or create a will + designate a guardian',            isCompleted: false },
  { id: 'o4',  categoryId: 'home',     text: 'Open or review a 529 college savings plan',                 isCompleted: false },
  { id: 'o5',  categoryId: 'home',     text: 'Audit all subscriptions and cancel unused ones',             isCompleted: false },
  { id: 'o6',  categoryId: 'home',     text: 'Review and update home/auto/life insurance coverage',       isCompleted: false },
  { id: 'o7',  categoryId: 'home',     text: 'Organize important docs (birth cert, SSN, insurance cards)', isCompleted: false },
  { id: 'o8',  categoryId: 'home',     text: 'Deep clean and declutter main living spaces',                isCompleted: false },
  { id: 'o9',  categoryId: 'home',     text: 'Build up freezer meals for when leave ends',                isCompleted: false },
  { id: 'o10', categoryId: 'home',     text: 'Tackle any deferred home maintenance items',                isCompleted: false },
  // Personal Development
  { id: 'p1',  categoryId: 'personal', text: 'Work on portfolio website',                                  isCompleted: false },
  { id: 'p2',  categoryId: 'personal', text: 'Continue Garmin/fitness app project',                        isCompleted: false },
  { id: 'p3',  categoryId: 'personal', text: 'Improve typing speed (15 min/day practice)',                  isCompleted: false },
  { id: 'p4',  categoryId: 'personal', text: 'Read 2 books',                                               isCompleted: false },
  { id: 'p5',  categoryId: 'personal', text: 'Explore one new technical skill or course',                   isCompleted: false },
  { id: 'p6',  categoryId: 'personal', text: 'Plan a date night — prioritize your relationship',           isCompleted: false },
  { id: 'p7',  categoryId: 'personal', text: "Reconnect with friends you've been meaning to reach",        isCompleted: false },
  { id: 'p8',  categoryId: 'personal', text: 'Write a letter to your baby about this time in your life',   isCompleted: false },
  { id: 'p9',  categoryId: 'personal', text: 'Reflect on return-to-work goals — what do you want to change?', isCompleted: false },
]
