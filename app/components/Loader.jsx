'use client';

import { tailChase } from 'ldrs';

tailChase.register();

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full">
      <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
    </div>
  );
}
