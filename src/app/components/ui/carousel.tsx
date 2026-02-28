import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

type CarouselContextProps = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: "horizontal" | "vertical";
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

type CarouselProps = {
  opts?: { align?: string; loop?: boolean };
  orientation?: "horizontal" | "vertical";
};

function Carousel({
  orientation = "horizontal",
  opts,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const loop = opts?.loop ?? false;

  const canScrollPrev = loop ? slideCount > 1 : currentIndex > 0;
  const canScrollNext = loop ? slideCount > 1 : currentIndex < slideCount - 1;

  const scrollPrev = React.useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const slideWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth
      : container.offsetWidth;

    if (loop && currentIndex <= 0) {
      setCurrentIndex(slideCount - 1);
      container.scrollTo({
        left: slideWidth * (slideCount - 1),
        behavior: "smooth",
      });
    } else {
      const newIndex = Math.max(0, currentIndex - 1);
      setCurrentIndex(newIndex);
      container.scrollTo({ left: slideWidth * newIndex, behavior: "smooth" });
    }
  }, [currentIndex, slideCount, loop]);

  const scrollNext = React.useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const slideWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth
      : container.offsetWidth;

    if (loop && currentIndex >= slideCount - 1) {
      setCurrentIndex(0);
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const newIndex = Math.min(slideCount - 1, currentIndex + 1);
      setCurrentIndex(newIndex);
      container.scrollTo({ left: slideWidth * newIndex, behavior: "smooth" });
    }
  }, [currentIndex, slideCount, loop]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  // Count slides when children mount
  React.useEffect(() => {
    if (containerRef.current) {
      setSlideCount(containerRef.current.children.length);
    }
  }, [children]);

  // Provide ref to CarouselContent via context
  const contextValue = React.useMemo(
    () => ({
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
      orientation,
    }),
    [scrollPrev, scrollNext, canScrollPrev, canScrollNext, orientation]
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.props["data-slot"] === "carousel-content") {
            return React.cloneElement(child as React.ReactElement<any>, {
              ref: containerRef,
            });
          }
          return child;
        })}
      </div>
    </CarouselContext.Provider>
  );
}

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      className={cn(
        "flex overflow-x-auto scrollbar-hide snap-x snap-mandatory",
        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        className
      )}
      data-slot="carousel-content"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
      {...props}
    />
  );
});
CarouselContent.displayName = "CarouselContent";

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full snap-start",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
