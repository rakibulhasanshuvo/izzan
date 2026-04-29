import re

with open('src/components/CartDrawer.tsx', 'r') as f:
    content = f.read()

content = content.replace('''          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#f8f6f0] dark:bg-[#1a1f1b] z-[90] shadow-2xl flex flex-col"
          >''', '''          {/* Drawer */}
          <FocusTrap focusTrapOptions={{ fallbackFocus: "body", escapeDeactivates: false }}>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#f8f6f0] dark:bg-[#1a1f1b] z-[90] shadow-2xl flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Shopping Cart"
            >''')

content = content.replace('''              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>''', '''              </div>
            )}
            </motion.div>
          </FocusTrap>
        </>
      )}
    </AnimatePresence>''')

with open('src/components/CartDrawer.tsx', 'w') as f:
    f.write(content)
