import React from 'react';
import image_404 from '../../assert/404_dribbble.gif';

export default function NotFoundPage() {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
            <div className="text-center">
              <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url(${image_404})` }}>
                <h1 className="text-6xl text-black pt-20">404</h1>
              </div>

              <div className="mt-10">
                <h3 className="text-4xl">Looks like you're lost</h3>
                <p className="mt-4">The page you are looking for is not available!</p>
                <a href="/" className="block mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Go to Home</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}