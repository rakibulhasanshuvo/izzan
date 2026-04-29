import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

content = content.replace('''import { Search } from "./Search";''', '''import { Search } from "./Search";
import FocusTrap from "focus-trap-react";''')

content = content.replace('''        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden absolute top-full left-0 right-0 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg z-10"
            >''', '''        <AnimatePresence>
          {isMobileMenuOpen && (
            <FocusTrap focusTrapOptions={{ fallbackFocus: "body", escapeDeactivates: false }}>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden absolute top-full left-0 right-0 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg z-10"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Menu"
              >''')

content = content.replace('''              </nav>
            </motion.div>
          )}
        </AnimatePresence>''', '''              </nav>
              </motion.div>
            </FocusTrap>
          )}
        </AnimatePresence>''')

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
