"use clint";

import { useMenuStore } from "@/store/toggleMenuStore";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const MenuToggle = () => {
  const { menuOpen, toggleMenu } = useMenuStore();

  return (
    <button onClick={toggleMenu}>
      <motion.div
        transition={{ duration: 0.5 }}
        animate={{ rotate: menuOpen ? 360 : 0 }}
      >
        {menuOpen ? <ChevronsRight /> : <ChevronsLeft />}
      </motion.div>
    </button>
  );
};

export default MenuToggle;
