/******************************************************************************
 * IPJourneyTracker.jsx
 * 
 * A single-file "Band IP Protection" tracker with:
 *  - Full data for Formation, Recording, Distribution, Performance, Merchandise
 *  - Complete Basic + Advanced template language for each relevant step
 *  - Global progress summary at the top
 *  - Accordion for stage sections
 *  - InfoBoxes for "What is it?" and "Why this matters"
 *  - Clear "Action Steps" heading for tasks
 *  - Inline expansions for step-based contract examples
 *  - Tailwind-based color scheme & layout
 *
 *  NOTE: All costs, percentages, and contract texts are illustrative examples,
 *        not legal advice. 
 ******************************************************************************/

import React, { useState } from 'react';
import { 
  Music,       // used for "formation"
  Mic,         // used for "recording"
  Share2,      // used for "distribution"
  Star,        // used for "performance"
  ShoppingBag, // used for "merchandise"
  AlertCircle, 
  CheckCircle, 
  ChevronDown, 
  ChevronRight, 
  ExternalLink
} from 'lucide-react';  

/* ---------------------------------------------------------------------------
   1) SMALL COMPONENTS
--------------------------------------------------------------------------- */

// A link component that shows an external link icon
const ResourceLink = ({ href, children }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:text-blue-700 inline-flex items-center space-x-1 hover:underline"
  >
    <span>{children}</span>
    <ExternalLink className="w-3 h-3" />
  </a>
);

// A simple progress bar used for stage progress
const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded h-2">
    <div 
      className="bg-purple-500 h-2 rounded" 
      style={{ width: `${progress}%` }}
    />
  </div>
);

// A small badge for step status in the tasks
const StepStatus = ({ status }) => {
  const colors = {
    completed: 'bg-green-100 text-green-800',
    inProgress: 'bg-blue-100 text-blue-800',
    pending: 'bg-gray-100 text-gray-800'
  };
  
  return (
    <span className={'px-2 py-1 rounded text-xs ' + colors[status]}>
      {status}
    </span>
  );
};

// InfoBox for general notes or disclaimers
const InfoBox = ({ title, children }) => (
  <div className="mt-4 bg-purple-50 p-4 rounded-lg">
    <h4 className="font-semibold text-purple-800 mb-2">{title}</h4>
    <div className="text-sm text-purple-900">{children}</div>
  </div>
);

// CostBox for listing cost breakdowns (approx examples)
const CostBox = ({ costs }) => (
  <div className="mt-4 bg-green-50 p-4 rounded-lg">
    <h4 className="font-semibold text-green-800 mb-2">Approximate Example Costs</h4>
    {Object.entries(costs).map(([item, cost]) => (
      <div key={item} className="flex justify-between text-sm mb-2">
        <span>{item}</span>
        <span className="font-medium">{cost}</span>
      </div>
    ))}
  </div>
);

/* ---------------------------------------------------------------------------
   2) MAIN COMPONENT
--------------------------------------------------------------------------- */

const IPJourneyTracker = () => {
  // Which stage is selected
  const [selectedStage, setSelectedStage] = useState('formation');

  // Which tasks are expanded
  const [expandedTasks, setExpandedTasks] = useState(new Set());

  // Which steps have been completed
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Which step’s contract template is open
  const [openTemplateId, setOpenTemplateId] = useState(null);

  // Which "section" in the right panel is expanded (accordion)
  const [openSectionIndex, setOpenSectionIndex] = useState(null);

  // Toggle a task open/closed
  const toggleTask = (taskId) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      newSet.has(taskId) ? newSet.delete(taskId) : newSet.add(taskId);
      return newSet;
    });
  };

  // Toggle a step completed/pending
  const toggleStep = (stepId) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      newSet.has(stepId) ? newSet.delete(stepId) : newSet.add(stepId);
      return newSet;
    });
  };

  // Toggle showing the template example
  const toggleTemplate = (stepId) => {
    setOpenTemplateId(prev => (prev === stepId ? null : stepId));
  };

  // Toggle a "section" in the right panel
  const toggleSection = (index) => {
    setOpenSectionIndex(prev => (prev === index ? null : index));
  };

  /* ------------------------------------------------------------------------
     3) STAGE DATA
     Each stage must have "tasks" array. Full Basic & Advanced text inserted.
  ------------------------------------------------------------------------ */

  const stages = {
    formation: {
      title: 'Band Formation',
      icon: <Music className="w-6 h-6" />,
      color: 'bg-purple-100',
      description: 'Establish your band identity and protect core assets',
      content: {
        whatIsIt:
          'The critical foundation stage where you establish legal protections for your band name, creative works, and business relationships.',
        whyItMatters:
          'Decisions made now will impact your entire music career. Proper protection prevents costly changes and legal issues later.',
        sections: [
          {
            title: 'Band Name Protection',
            description: 'Secure rights to your band name and branding',
            details: {
              steps: [
                'Search USPTO database for conflicts',
                'Check state trademark registries',
                'Monitor for potential infringement'
              ],
              costs: {
                'USPTO Filing (Example)': '$250–350',
                'Attorney Review (Example)': '$500–1500'
              },
              warnings: [
                'Start search early',
                'Document all efforts'
              ]
            }
          },
          {
            title: 'Member Agreements',
            description: 'Define ownership and responsibilities',
            details: {
              components: [
                'Band name ownership',
                'Song writing credits',
                'Revenue sharing'
              ],
              costs: {
                'Legal Template (Example)': '$200–500',
                'Attorney Review (Example)': '$500–1000'
              },
              warnings: [
                'Get everything in writing',
                'Address future scenarios'
              ]
            }
          }
        ]
      },
      tasks: [
        {
          id: 'name-protection',
          title: 'Name & Brand Protection',
          description: 'Secure your band name and visual identity',
          priority: 'High',
          steps: [
            {
              id: 'name-search',
              title: 'Trademark Search',
              detail: 'Check USPTO database and existing bands',
              warning: 'Essential first step'
            }
          ]
        },
        {
          id: 'member-agreements',
          title: 'Member Agreements',
          description: 'Establish legal framework between members',
          priority: 'High',
          steps: [
            {
              id: 'basic-agreement',
              title: 'Band Agreement',
              detail: 'Document ownership, revenue splits, and roles',
              warning: 'Get this in writing before any commercial activity',
              templateExample: {
                title: 'Band Agreement (Basic + Advanced)',
                content: `
                  <h4><strong>Basic Short-Form Agreement:</strong></h4>
                  <p>
                    1. <em>Band Name Ownership</em>: All members equally own the Band Name. 
                    Any usage requires majority consent.<br/>
                    2. <em>Revenue Splits</em>: Profits from gigs, merch, etc. 
                    are divided per agreed percentages.<br/>
                    3. <em>Dispute Resolution</em>: Parties will attempt to mediate 
                    before taking legal action.
                  </p>

                  <hr class="my-4"/>

                  <h4><strong>Advanced “Multi-Scenario” Agreement (Complete Example):</strong></h4>
                  <p><em>1. Definitions & Parties</em><br/>
                  This Agreement is made by all current members of the Band (the “Parties”). 
                  "Band Name" covers trademarks, logos, designs, and associated branding.
                  </p>

                  <p><em>2. Intellectual Property</em><br/>
                  (a) <strong>Song Rights</strong>: For co-written songs, 
                  percentages are outlined in Attachment A. Departing members keep existing 
                  royalties but grant the Band performance rights.<br/>
                  (b) <strong>Merch & Artwork</strong>: The Band collectively owns 
                  any logos, artwork, or designs created for official use unless 
                  otherwise licensed.
                  </p>

                  <p><em>3. Roles & Responsibilities</em><br/>
                  (a) <strong>Manager/Leader</strong>: The Band may designate a manager 
                  for day-to-day tasks, but major decisions (over $500, label deals, 
                  new members) require a majority or unanimous vote.<br/>
                  (b) <strong>Financial Accounting</strong>: All revenues 
                  and expenses (studio, marketing, gear) must be tracked. 
                  Any member can request an audit with 7 days’ notice.
                  </p>

                  <p><em>4. Revenue Allocation</em><br/>
                  (a) <strong>Net Income</strong> means total receipts minus 
                  agreed costs. Net income is split per the formula in Attachment B.<br/>
                  (b) <strong>Distributions</strong>: Members receive payouts 
                  quarterly (or as agreed). Any operational fund is withheld 
                  before splits.
                  </p>

                  <p><em>5. Departure or Expulsion</em><br/>
                  (a) <strong>Voluntary Leave</strong>: A departing member 
                  forfeits new works but retains past shares. They can’t 
                  use the Band Name for new projects unless agreed.<br/>
                  (b) <strong>Cause Expulsion</strong>: By supermajority, 
                  a member can be expelled for misconduct, breach of contract, 
                  or financial malfeasance. 
                  They keep vested shares in past works but lose future claims.
                  </p>

                  <p><em>6. Dispute Resolution & Governing Law</em><br/>
                  Parties shall first mediate. 
                  If unresolved, disputes go to binding arbitration in [Jurisdiction]. 
                  This Agreement is governed by the laws of [State/Province/Country].
                  </p>

                  <p><em>7. Signatures & Attachments</em><br/>
                  Each Party signs below, acknowledging full understanding and consent. 
                  Attachments detail specific splits, IP ownership details, etc.
                  </p>
                `
              }
            }
          ]
        }
      ]
    },

    recording: {
      title: 'Recording & Production',
      icon: <Mic className="w-6 h-6" />,
      color: 'bg-blue-100',
      description: 'Protect your recorded works',
      content: {
        whatIsIt:
          'Legal protection for your recordings, including producer agreements, session musicians, and studio contracts.',
        whyItMatters:
          'Clear ownership and rights management prevents future disputes and ensures proper revenue collection.',
        sections: [
          {
            title: 'Producer Agreements',
            description: 'Define the relationship with producers',
            details: {
              components: [ 'Producer compensation', 'Ownership of recordings' ],
              costs: {
                'Template (Example)': '$300–600',
                'Legal Review (Example)': '$500–1000'
              }
            }
          }
        ]
      },
      tasks: [
        {
          id: 'producer-agreement',
          title: 'Producer Agreement',
          description: 'Outline roles, compensation, ownership with a producer',
          steps: [
            {
              id: 'producer-contract',
              title: 'Draft Producer Agreement',
              detail: 'Clarify compensation, royalties, deliverables',
              templateExample: {
                title: 'Producer Agreement (Basic + Advanced)',
                content: `
                  <h4><strong>Basic Short-Form Producer Agreement:</strong></h4>
                  <p>
                    1. <em>Work-for-Hire</em>: Producer delivers final masters, 
                    which are owned by the Band. The Producer receives an agreed 
                    upfront fee or modest points.<br/>
                    2. <em>Credit</em>: “Produced by [Name]” in all liner notes 
                    and digital credits.<br/>
                    3. <em>Delivery Deadline</em>: Producer must deliver final 
                    files by [Date].
                  </p>

                  <hr class="my-4"/>

                  <h4><strong>Advanced “Points + Re-record Restriction” Producer Agreement:</strong></h4>
                  <p><em>1. Scope of Work</em><br/>
                  Producer will record and/or mix [Number of Tracks]. 
                  Additional tracks require a separate addendum.</p>

                  <p><em>2. Ownership of Masters</em><br/>
                  The Band owns all masters. 
                  Producer receives a [X]% royalty on net receipts from 
                  these masters after distribution fees. 
                  Producer shall be paid quarterly with statements.</p>

                  <p><em>3. Re-record Restriction</em><br/>
                  The Band agrees not to re-record these specific tracks 
                  for a minimum of [3 years] without Producer’s written approval. 
                  This ensures the Producer’s unique version retains its value.</p>

                  <p><em>4. Sample Clearance</em><br/>
                  If Producer incorporates samples, Producer must either 
                  (a) provide proof of clearance or (b) confirm these are 
                  original or public domain. 
                  Any clearance costs are negotiated separately, 
                  unless stated in Attachment A.</p>

                  <p><em>5. Delivery & Approvals</em><br/>
                  Producer will deliver reference mixes by [Interim Date], 
                  final masters by [Final Delivery Date]. 
                  The Band must provide timely feedback. 
                  Delays caused by the Band do not breach Producer’s obligations.</p>

                  <p><em>6. Dispute Resolution</em><br/>
                  Any disagreement over fees, points, or creative direction 
                  will first go to mediation. If unresolved, 
                  binding arbitration in [Jurisdiction] shall apply.</p>
                `
              }
            }
          ]
        }
      ]
    },

    distribution: {
      title: 'Distribution',
      icon: <Share2 className="w-6 h-6" />,
      color: 'bg-green-100',
      description: 'Manage streaming and distribution rights',
      content: {
        whatIsIt:
          'Legal framework for distributing your music across platforms and formats.',
        whyItMatters:
          'Proper distribution ensures you retain control and collect all due revenue.',
        sections: []
      },
      tasks: [
        {
          id: 'streaming-setup',
          title: 'Streaming Setup',
          description: 'Configure digital distribution',
          steps: [
            {
              id: 'distributor',
              title: 'Select Distributor',
              detail: 'Choose a digital distribution service (DistroKid, TuneCore, etc.)'
            }
          ]
        }
      ]
    },

    performance: {
      title: 'Live Performance',
      icon: <Star className="w-6 h-6" />,
      color: 'bg-yellow-100',
      description: 'Handle performance rights, venues, and live show logistics',
      content: {
        whatIsIt: 'Focuses on live show IP aspects, including booking agents and venue contracts.',
        whyItMatters: 'Protects you from liability and ensures fair compensation.',
        sections: []
      },
      tasks: [
        {
          id: 'booking-agreement',
          title: 'Booking Agreement',
          description: 'Sign with a reputable booking agent/agency',
          priority: 'High',
          steps: [
            {
              id: 'contract-review',
              title: 'Contract Review',
              detail: 'Attorney checks exclusivity, termination clauses',
              templateExample: {
                title: 'Booking Agreement (Basic + Advanced)',
                content: `
                  <h4><strong>Basic Short-Form Booking Agreement Clause:</strong></h4>
                  <p>
                    1. <em>Commission Rate</em>: Agent receives 10–15% of gross show revenue 
                    for bookings made during the Agreement term.<br/>
                    2. <em>Territory & Exclusivity</em>: Agent represents the Band 
                    in [Geographic Region]. The Band cannot use other agents 
                    in that region unless the Agent declines a booking request.
                  </p>

                  <hr class="my-4"/>

                  <h4><strong>Advanced Booking Agreement (Complete Example):</strong></h4>
                  <p><em>1. Parties & Territory</em><br/>
                  This Agreement is between [Band Name] and [Agent/Agency]. 
                  Agent has exclusive rights to book shows in [Territory].</p>

                  <p><em>2. Commission & Payment</em><br/>
                  (a) Commission: Agent earns [10–15%] on gross receipts from 
                  each booked event (ticket sales, guarantees, 
                  plus potentially merch if negotiated).<br/>
                  (b) Payment Timeline: The Band must pay the Agent’s commission 
                  within [X] days of receiving show settlement. 
                  Late payments accrue interest at [Y]%.
                  </p>

                  <p><em>3. Obligations of the Band</em><br/>
                  The Band must inform the Agent promptly of any direct 
                  booking inquiries. If the Band bypasses the Agent for 
                  a show within the Territory, the Agent is still due 
                  commission unless otherwise agreed.</p>

                  <p><em>4. Cancellation & Force Majeure</em><br/>
                  (a) Agent will use best efforts to mitigate cancellations 
                  or postponements. The Band agrees to follow any 
                  negotiated kill fees.<br/>
                  (b) In events of force majeure (natural disasters, 
                  pandemics, etc.), neither Party is liable for 
                  unpreventable cancellations, but Agent’s commission 
                  for partially completed events is still due if 
                  not refunded by the promoter.
                  </p>

                  <p><em>5. Term & Termination</em><br/>
                  (a) Initial Term: [X months or 1 year], automatically 
                  renewing unless either Party gives 30 days’ notice.<br/>
                  (b) Breach: If either Party materially breaches 
                  (e.g., nonpayment, failure to procure shows), 
                  the other Party may terminate after a cure period 
                  of [14 days].
                  </p>

                  <p><em>6. Dispute Resolution</em><br/>
                  Both Parties agree to attempt mediation first. 
                  If unresolved, disputes go to binding arbitration 
                  in [Jurisdiction]. The losing Party typically covers 
                  arbitration fees unless the arbitrator decides otherwise.
                  </p>
                `
              }
            }
          ]
        }
      ]
    },

    merchandise: {
      title: 'Merchandise',
      icon: <ShoppingBag className="w-6 h-6" />,
      color: 'bg-orange-100',
      description: 'Expand revenue and brand awareness through merchandise',
      content: {
        whatIsIt:
          'Building and protecting your brand through official band merchandise such as T-shirts, posters, etc.',
        whyItMatters:
          'Merch is a critical revenue stream and promotional tool for your band. Proper IP control prevents unauthorized use.',
        sections: []
      },
      tasks: [
        {
          id: 'design-protection',
          title: 'Design Protection',
          description: 'Trademark or copyright your band logo/merch designs',
          steps: [
            {
              id: 'file-trademark',
              title: 'File Trademark Application',
              detail: 'Secure federal registration for your band logo',
              templateExample: {
                title: 'Trademark Application (Basic + Advanced)',
                content: `
                  <h4><strong>Basic Short-Form Trademark Filing Guide:</strong></h4>
                  <p>
                    1. <em>Applicant Info</em>: Provide the legal name & address 
                    (Band or authorized rep).<br/>
                    2. <em>Specimen</em>: Show the mark as used in commerce 
                    (e.g. a T-shirt, album cover).<br/>
                    3. <em>Class(es) of Goods/Services</em>: Typically Class 9 (music), 
                    Class 25 (clothing), Class 41 (entertainment), etc.
                  </p>

                  <hr class="my-4"/>

                  <h4><strong>Advanced Trademark Application Example:</strong></h4>
                  <p><em>1. Detailed Applicant & Ownership</em><br/>
                  The Band, operating as [LLC or Partnership], is the applicant. 
                  If filing individually, each member must disclaim 
                  shared ownership or designate one rep with assignment provisions.</p>

                  <p><em>2. Priority Date & Intent-to-Use</em><br/>
                  (a) <strong>Priority</strong>: If you’ve used the mark 
                  in commerce, note first use date. If not, file 
                  an Intent-to-Use application, then submit proof later.<br/>
                  (b) <strong>International Classes</strong>: 
                  You might file in multiple classes, e.g., Class 9, Class 25, Class 41.
                  </p>

                  <p><em>3. Specimen & Declaration</em><br/>
                  Provide an image or screenshot showing the mark in actual commerce. 
                  The signatory must declare truth under penalty of perjury.
                  </p>

                  <p><em>4. Examining Attorney & Office Actions</em><br/>
                  The USPTO may issue an Office Action for conflicts or clarity issues. 
                  You have 6 months to respond. Consider an attorney or be prepared for legal argument.
                  </p>

                  <p><em>5. Publication & Opposition</em><br/>
                  If approved, your mark is published in the Official Gazette. 
                  Others can oppose within 30 days. If uncontested or resolved, you get registration.
                  </p>

                  <p><em>6. Maintenance & Renewal</em><br/>
                  (a) Section 8 filing: between 5th & 6th year for continued use.<br/>
                  (b) Section 9 renewal: every 10 years with proof of use.
                  </p>

                  <p><em>7. International Extensions</em><br/>
                  Consider WIPO/Madrid Protocol for global coverage. 
                  Each country has its own rules & fees.
                  </p>
                `
              }
            }
          ]
        }
      ]
    }
  };

  /* ------------------------------------------------------------------------
     4) GLOBAL PROGRESS: Count all steps across all stages
  ------------------------------------------------------------------------ */
  const totalStepsGlobal = Object.values(stages).reduce((sum, stage) => {
    return sum + stage.tasks.reduce((taskSum, t) => taskSum + t.steps.length, 0);
  }, 0);

  const completedStepsGlobal = completedSteps.size;

  const overallPercentage = totalStepsGlobal === 0
    ? 0
    : Math.round((completedStepsGlobal / totalStepsGlobal) * 100);

  /* ------------------------------------------------------------------------
     5) HELPER: GET PER-STAGE PROGRESS
  ------------------------------------------------------------------------ */
  const getStageProgress = (stageKey) => {
    const stage = stages[stageKey];
    let totalSteps = 0;
    let completedCount = 0;
    stage.tasks.forEach(task => {
      task.steps.forEach(step => {
        totalSteps++;
        if (completedSteps.has(step.id)) {
          completedCount++;
        }
      });
    });
    return totalSteps === 0 
      ? 0 
      : Math.round((completedCount / totalSteps) * 100);
  };

  /* ------------------------------------------------------------------------
     6) RENDER
  ------------------------------------------------------------------------ */
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Outer card */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          {/* --- Global Progress at the top --- */}
          <div className="text-right mb-4 text-gray-600 text-sm">
            Overall Progress: {completedStepsGlobal}/{totalStepsGlobal} steps ({overallPercentage}%)
          </div>

          {/* HEADER */}
          <div className="text-center pb-8">
            <h2 className="text-4xl font-bold text-purple-800">
              Shugo
              <br />
              Your Band's IP Journey
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              A step-by-step guide to protecting & monetizing your band's intellectual property
            </p>
          </div>

          {/* TIMELINE DOTS (horizontal overflow for mobile) */}
          <div className="mb-12 bg-white rounded-lg p-8 shadow-sm">
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2" />
              <div className="relative flex overflow-x-auto flex-nowrap space-x-6 md:space-x-0 md:justify-between">
                {Object.entries(stages).map(([key, stage]) => {
                  const stageProgress = getStageProgress(key);
                  const isSelected = selectedStage === key;
                  return (
                    <div 
                      key={key}
                      className="flex flex-col items-center cursor-pointer z-10 min-w-[80px]"
                      onClick={() => setSelectedStage(key)}
                    >
                      <div 
                        className={
                          'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ' + 
                          stage.color +
                          (isSelected ? ' ring-4 ring-purple-400 shadow-lg scale-110' : ' hover:scale-105')
                        }
                      >
                        {stage.icon}
                      </div>
                      <div className="mt-4 text-center">
                        <div className={'font-semibold ' + (isSelected ? 'text-purple-700' : 'text-gray-600')}>
                          {stage.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {stageProgress}% Complete
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main layout: left sidebar + right content */}
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
            
            {/* Left sidebar: stage list + progress bars */}
            <div className="w-full md:w-1/4 space-y-4">
              <div className="sticky top-4 space-y-4">
                {Object.entries(stages).map(([key, stage]) => {
                  const stageProgress = getStageProgress(key);
                  const isSelected = selectedStage === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedStage(key)}
                      className={
                        'rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg p-4 ' + 
                        stage.color + 
                        (isSelected ? ' ring-2 ring-purple-400 shadow-md' : '')
                      }
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        {stage.icon}
                        <span className="font-semibold">{stage.title}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
                      <ProgressBar progress={stageProgress} />
                      <p className="text-xs text-right mt-1 text-gray-500">
                        {stageProgress}% Complete
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right content */}
            <div className="w-full md:w-3/4 space-y-6">
              {/* InfoBox: "What is it?" */}
              <InfoBox title={stages[selectedStage].title}>
                {stages[selectedStage].content.whatIsIt}
              </InfoBox>

              {/* InfoBox: "Why This Matters" */}
              <InfoBox title="Why This Matters">
                {stages[selectedStage].content.whyItMatters}
              </InfoBox>

              {/* ACCORDION for sections */}
              {stages[selectedStage].content.sections && stages[selectedStage].content.sections.length > 0 && (
                <div className="space-y-4">
                  {stages[selectedStage].content.sections.map((section, index) => {
                    const isOpen = openSectionIndex === index;
                    return (
                      <div key={index} className="bg-white rounded-lg shadow-sm">
                        <button
                          onClick={() => toggleSection(index)}
                          className="w-full text-left p-6"
                        >
                          <h3 className="text-xl font-bold text-purple-700 mb-1">
                            {section.title}
                          </h3>
                          <p className="text-gray-600">
                            {section.description}
                          </p>
                        </button>
                        {isOpen && section.details && (
                          <div className="px-6 pb-6">
                            <div className="space-y-4">
                              {/* steps array */}
                              {section.details.steps && (
                                <div className="bg-blue-50 p-4 rounded-lg">
                                  <h4 className="font-semibold text-blue-800 mb-2">
                                    Key Steps
                                  </h4>
                                  <ul className="space-y-2">
                                    {section.details.steps.map((stepItem, idx) => (
                                      <li key={idx} className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                                        <span className="text-blue-900">{stepItem}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* costs object */}
                              {section.details.costs && (
                                <CostBox costs={section.details.costs} />
                              )}

                              {/* warnings array */}
                              {section.details.warnings && (
                                <div className="bg-red-50 p-4 rounded-lg">
                                  <h4 className="font-semibold text-red-800 mb-2">
                                    Important Warnings
                                  </h4>
                                  <ul className="space-y-2">
                                    {section.details.warnings.map((w, idx) => (
                                      <li key={idx} className="flex items-start">
                                        <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                                        <span className="text-red-900">{w}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ACTION STEPS HEADING */}
              <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">Action Steps</h2>

              {stages[selectedStage].tasks.map(task => {
                const isTaskExpanded = expandedTasks.has(task.id);
                return (
                  <div 
                    key={task.id}
                    className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {/* Task header */}
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleTask(task.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-purple-700">
                            {task.title}
                          </h3>
                          {task.priority && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded mt-1 inline-block">
                              {task.priority} Priority
                            </span>
                          )}
                        </div>
                        {isTaskExpanded 
                          ? <ChevronDown className="w-5 h-5 text-gray-400" /> 
                          : <ChevronRight className="w-5 h-5 text-gray-400" />
                        }
                      </div>
                      <p className="text-gray-600">{task.description}</p>
                    </div>
                    
                    {/* Steps (expanded) */}
                    {isTaskExpanded && (
                      <div className="border-t px-6 py-4 bg-gray-50">
                        <div className="space-y-6">
                          {task.steps.map(step => {
                            const stepIsCompleted = completedSteps.has(step.id);
                            const hasTemplate = !!step.templateExample;
                            const isOpen = openTemplateId === step.id;

                            return (
                              <div key={step.id} className="space-y-3">
                                <div 
                                  className="flex items-start space-x-3 cursor-pointer group"
                                  onClick={() => toggleStep(step.id)}
                                >
                                  <CheckCircle 
                                    className={
                                      'w-5 h-5 mt-1 transition-colors duration-200 ' +
                                      (stepIsCompleted
                                        ? 'text-green-500'
                                        : 'text-gray-300 group-hover:text-purple-300')
                                    }
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                      <h4 className="font-semibold text-gray-800">
                                        {step.title}
                                      </h4>
                                      <StepStatus 
                                        status={stepIsCompleted ? 'completed' : 'pending'}
                                      />
                                    </div>
                                    <p className="text-gray-600 mt-1">
                                      {step.detail}
                                    </p>

                                    {step.warning && (
                                      <div className="flex items-center space-x-2 mt-2 text-amber-600">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm">
                                          {step.warning}
                                        </span>
                                      </div>
                                    )}

                                    {/* Template example toggle */}
                                    {hasTemplate && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleTemplate(step.id);
                                        }}
                                        className="text-blue-500 hover:underline text-sm mt-2 block"
                                      >
                                        {isOpen ? 'Hide Example Contract' : 'View Example Contract'}
                                      </button>
                                    )}
                                  </div>
                                </div>

                                {/* Template preview (if open) */}
                                {isOpen && step.templateExample && (
                                  <div className="ml-8 mt-1 p-4 border rounded bg-gray-50 text-sm text-gray-800">
                                    <h5 className="font-semibold text-purple-700 mb-2">
                                      {step.templateExample.title}
                                    </h5>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: step.templateExample.content
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* If no tasks exist */}
              {stages[selectedStage].tasks.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>Content for this stage coming soon...</p>
                </div>
              )}

              {/* FINAL DISCLAIMER BOX */}
              <InfoBox title="Additional Resources & Disclaimers">
                <p>
                  <strong>All listed costs and percentages are approximate examples only.</strong>{' '}
                  Actual fees may differ based on jurisdiction, provider, complexity, 
                  and frequent changes to filing/registration costs.
                </p>
                <p className="mt-2">
                  Information provided here is for general educational purposes only. 
                  For specific legal advice, consult a qualified attorney in your jurisdiction.
                </p>
                <ul className="list-disc list-inside mt-4 text-purple-900 space-y-1">
                  <li>
                    <ResourceLink href="https://www.copyright.gov">
                      U.S. Copyright Office
                    </ResourceLink>
                  </li>
                  <li>
                    <ResourceLink href="https://www.uspto.gov/">
                      U.S. Patent & Trademark Office
                    </ResourceLink>
                  </li>
                  <li>
                    <ResourceLink href="https://www.sba.gov/">
                      U.S. Small Business Administration
                    </ResourceLink>
                  </li>
                </ul>
              </InfoBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPJourneyTracker;
