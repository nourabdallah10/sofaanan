export default function ImageSkeleton() {
  return (
    <div className="absolute inset-0 bg-light-bg-accent dark:bg-dark-bg-accent overflow-hidden rounded-2xl">
      <div
        className="w-full h-full bg-gradient-to-r from-light-bg-accent via-light-bg-secondary to-light-bg-accent dark:from-dark-bg-accent dark:via-dark-bg-secondary dark:to-dark-bg-accent animate-shimmer opacity-70"
        style={{
          backgroundSize: '200% 100%',
        }}
        aria-hidden="true"
      />
    </div>
  );
}

