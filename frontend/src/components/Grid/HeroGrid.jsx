"use client";
import React, { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ImageComponent = React.memo(({ card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className={cn(
        "object-cover object-top absolute inset-0  h-full w-full transition duration-200 cursor-pointer"
      )}
      alt="thumbnail"
    />
  );
});


const SelectedCard = React.memo(({ selected }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 h-full w-full bg-black z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
});

const GridCard = React.memo(({ card, isSelected, wasLastSelected, onSelect }) => {
  return (
    <div className={cn(card.className)}>
      <motion.div
        // onClick={() => onSelect(card)}
        className={cn(
          card.className,
          "relative overflow-hidden",
          isSelected
            ? "rounded-lg cursor-pointer absolute inset-0 h-[90vh] w-[90vw] max-h-[800px] max-w-[1200px] m-auto z-50 flex justify-center items-center"
            : wasLastSelected
              ? "z-40 bg-white rounded-xl h-full w-full"
              : "bg-white rounded-xl h-full w-full  transition-shadow"
        )}
        layoutId={`card-${card.id}`}
      >
        {isSelected && <SelectedCard selected={card} />}
        <ImageComponent card={card} />
      </motion.div>
    </div>
  );
});

export const LayoutGrid = React.memo(({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const selectedRef = useRef();
  selectedRef.current = selected;

  const handleCardSelect = useCallback((card) => {
    setLastSelected(selectedRef.current);
    setSelected(card);
  }, []);

  const handleOutsideClick = useCallback(() => {
    setLastSelected(selectedRef.current);
    setSelected(null);
  }, []);

  return (
    <div className="w-full h-full xl:h-[60vh] p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card) => (
        <GridCard
          key={card.id}
          card={card}
          isSelected={selected?.id === card.id}
          wasLastSelected={lastSelected?.id === card.id}
        // onSelect={handleCardSelect}
        />
      ))}
      <motion.div
        // onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
});