import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  BriefcaseIcon,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleEllipsis,
  CodeIcon,
  FileText,
  GraduationCapIcon,
  Laugh,
  Layers,
  MailIcon,
  PartyPopper,
  Sparkles,
  UserRoundSearch,
  UserSearch,
  Award,
  Rocket,
  Brain,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { PresetReply } from '@/components/chat/preset-reply';
import { presetReplies, getConfig } from '@/lib/config-loader';

interface HelperBoostProps {
  submitQuery?: (query: string) => void;
  setInput?: (value: string) => void;
  handlePresetReply?: (question: string, reply: string, tool: string) => void;
}

const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Resume: 'Can I see your resume?',
  Contact:
    'How can I reach you? What kind of project would make you say "yes" immediately?',
};

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh, gradient: 'from-blue-500 to-cyan-500' },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness, gradient: 'from-purple-500 to-pink-500' },
  { key: 'Skills', color: '#856ED9', icon: Layers, gradient: 'from-emerald-500 to-teal-500' },
  { key: 'Resume', color: '#D97856', icon: FileText, gradient: 'from-orange-500 to-amber-500' },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch, gradient: 'from-rose-500 to-pink-500' },
];

// Helper drawer data with more questions from config
const specialQuestions = [
  'Who are you?',
  'Can I see your resume?',
  'What projects are you most proud of?',
  'What are your skills?',
  'How can I reach you?',
];

const getQuestionsFromConfig = () => {
  const config = getConfig();
  return [
    {
      id: 'me',
      name: 'About Me',
      icon: UserSearch,
      gradient: 'from-blue-500 to-cyan-500',
      questions: config.presetQuestions.me || [],
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: BriefcaseIcon,
      gradient: 'from-purple-500 to-pink-500',
      questions: config.presetQuestions.professional || [],
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: CodeIcon,
      gradient: 'from-emerald-500 to-teal-500',
      questions: config.presetQuestions.projects || [],
    },
    {
      id: 'achievements',
      name: 'Achievements',
      icon: Award,
      gradient: 'from-orange-500 to-amber-500',
      questions: (config.presetQuestions as any).achievements || [],
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: GraduationCapIcon,
      gradient: 'from-indigo-500 to-blue-500',
      questions: ['What are your skills?', 'What technologies do you work with?'],
    },
    {
      id: 'contact',
      name: 'Contact & Future',
      icon: MailIcon,
      gradient: 'from-rose-500 to-pink-500',
      questions: config.presetQuestions.contact || [],
    },
    {
      id: 'fun',
      name: 'Fun Facts',
      icon: PartyPopper,
      gradient: 'from-yellow-500 to-orange-500',
      questions: config.presetQuestions.fun || [],
    },
  ];
};

const questionsByCategory = getQuestionsFromConfig();

// Animated Chevron component
const AnimatedChevron = () => {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
      className="text-primary mb-1.5"
    >
      <ChevronUp size={16} />
    </motion.div>
  );
};

export default function HelperBoost({
  submitQuery,
  setInput,
  handlePresetReply,
}: HelperBoostProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [showPresetReply, setShowPresetReply] = useState<string | null>(null);

  const handleQuestionClick = (questionKey: string) => {
    const question = questions[questionKey as keyof typeof questions];
    
    const presetMapping: { [key: string]: string } = {
      'Me': 'Who are you?',
      'Projects': 'What projects are you most proud of?',
      'Skills': 'What are your skills?',
      'Resume': 'Can I see your resume?',
      'Contact': 'How can I reach you?'
    };
    
    const presetKey = presetMapping[questionKey];
    if (presetKey && presetReplies[presetKey] && handlePresetReply) {
      const preset = presetReplies[presetKey];
      handlePresetReply(presetKey, preset.reply, preset.tool);
    } else if (submitQuery) {
      submitQuery(question);
    }
  };

  const handleDrawerQuestionClick = (question: string) => {
    const preset = presetReplies[question as keyof typeof presetReplies];
    
    if (preset && handlePresetReply) {
      handlePresetReply(question, preset.reply, preset.tool);
    } else if (submitQuery) {
      submitQuery(question);
    }
    setOpen(false);
  };

  const handleGetAiResponse = (question: string) => {
    setShowPresetReply(null);
    if (submitQuery) {
      submitQuery(question);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <div className="w-full">
          {/* Toggle Button */}
          <div
            className={
              isVisible
                ? 'mb-4 flex justify-center'
                : 'mb-0 flex justify-center'
            }
          >
            <button
              onClick={toggleVisibility}
              className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {isVisible ? (
                <>
                  <ChevronDown size={16} />
                  Hide quick questions
                </>
              ) : (
                <>
                  <ChevronUp size={16} />
                  Show quick questions
                </>
              )}
            </button>
          </div>

          {/* HelperBoost Content */}
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div
                className="flex w-full flex-wrap gap-2 md:gap-3 justify-center"
              >
                {questionConfig.map(({ key, color, icon: Icon, gradient }) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => handleQuestionClick(key)}
                      variant="outline"
                      className={cn(
                        "h-auto min-w-[110px] flex-shrink-0 cursor-pointer rounded-xl",
                        "border-2 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm",
                        "px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200",
                        "border-neutral-200 dark:border-neutral-800",
                        "hover:border-opacity-50"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={cn(
                          "p-1.5 rounded-lg",
                          `bg-gradient-to-br ${gradient}`
                        )}>
                          <Icon size={16} strokeWidth={2.5} className="text-white" />
                        </div>
                        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{key}</span>
                      </div>
                    </Button>
                  </motion.div>
                ))}

                {/* More Questions Button */}
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <DrawerTrigger asChild>
                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="group relative flex flex-shrink-0 items-center justify-center cursor-pointer"
                        >
                          <Button
                            variant="outline"
                            className={cn(
                              "h-auto min-w-[110px] cursor-pointer rounded-xl border-2",
                              "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30",
                              "border-blue-200 dark:border-blue-800",
                              "hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/40 dark:hover:to-purple-900/40",
                              "px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200"
                            )}
                          >
                            <div className="flex items-center gap-2.5">
                              <CircleEllipsis
                                className="h-4 w-4 text-blue-600 dark:text-blue-400"
                                strokeWidth={2.5}
                              />
                              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">More</span>
                            </div>
                          </Button>
                        </motion.div>
                      </DrawerTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <AnimatedChevron />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </motion.div>
          )}
        </div>

        {/* Enhanced Drawer Content */}
        <DrawerContent className="flex h-[85%] flex-col rounded-t-[20px] bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 outline-none lg:h-[70%]">
          <div className="flex-1 overflow-y-auto rounded-t-[20px] p-6 md:p-8">
            <div className="mx-auto max-w-4xl">
              {/* Drawer Header */}
              <div className="mb-8 text-center space-y-3">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Browse Questions
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Choose from a wide range of questions organized by category
                  </p>
                </motion.div>
              </div>

              <div
                aria-hidden
                className="mx-auto mb-8 h-1 w-20 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700"
              />

              <div className="space-y-10 pb-16">
                {questionsByCategory.map((category, catIndex) => (
                  <CategorySection
                    key={category.id}
                    name={category.name}
                    Icon={category.icon}
                    gradient={category.gradient}
                    questions={category.questions}
                    onQuestionClick={handleDrawerQuestionClick}
                    index={catIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

// Enhanced Category Section Component
interface CategorySectionProps {
  name: string;
  Icon: React.ElementType;
  gradient: string;
  questions: string[];
  onQuestionClick: (question: string) => void;
  index: number;
}

function CategorySection({
  name,
  Icon,
  gradient,
  questions,
  onQuestionClick,
  index,
}: CategorySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 px-2">
        <div className={cn(
          "p-2.5 rounded-xl",
          `bg-gradient-to-br ${gradient}`
        )}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <DrawerTitle className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          {name}
        </DrawerTitle>
        <div className="flex-1 h-px bg-gradient-to-r from-neutral-200 to-transparent dark:from-neutral-700" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {questions.map((question, qIndex) => (
          <QuestionItem
            key={qIndex}
            question={question}
            onClick={() => onQuestionClick(question)}
            isSpecial={specialQuestions.includes(question)}
            gradient={gradient}
            delay={qIndex * 0.05}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Enhanced Question Item Component
interface QuestionItemProps {
  question: string;
  onClick: () => void;
  isSpecial: boolean;
  gradient: string;
  delay: number;
}

function QuestionItem({ question, onClick, isSpecial, gradient, delay }: QuestionItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={cn(
        'group relative flex w-full items-center justify-between rounded-xl',
        'px-5 py-4 text-left font-medium transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        isSpecial
          ? `bg-gradient-to-br ${gradient} text-white shadow-lg`
          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
      )}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {isSpecial && <Sparkles className="h-4 w-4 shrink-0" />}
        <span className="text-sm leading-snug truncate">{question}</span>
      </div>
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
        className="shrink-0"
      >
        <ChevronRight
          className={cn(
            'h-5 w-5',
            isSpecial ? 'text-white' : 'text-neutral-400'
          )}
        />
      </motion.div>
      
      {/* Shine effect */}
      {isHovered && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      )}
    </motion.button>
  );
}