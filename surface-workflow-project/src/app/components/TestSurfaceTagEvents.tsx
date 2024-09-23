import React, { useEffect, useState } from 'react';

interface EventData {
  eventName: string;
  visitorId: string;
  metadata: string;
  timestamp: string;
}

const TestSurfaceTagEvents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/events/fetch');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(() => {
      fetchEvents();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-md shadow p-4 my-4">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex justify-between items-center"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          Test Surface Tag Events
        </h2>
        <button
          className={`transform transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ⬇️
        </button>
      </div>

      {isOpen && (
        <div className="mt-4">
          <p className="text-gray-700 mb-2">
            Test if the Surface Tag is properly installed and emitting events.
          </p>

          {/* Loader - Display while loading */}
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
              <p className="ml-2">Refreshing data...</p>
            </div>
          ) : (
            <table className="table-auto w-full text-gray-800">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Event</th>
                  <th className="p-2">Visitor</th>
                  <th className="p-2">Metadata</th>
                  <th className="p-2">Created at</th>
                </tr>
              </thead>
              <tbody>
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{event.eventName}</td>
                      <td className="p-2">{event.visitorId}</td>
                      <td className="p-2">{event.metadata}</td>
                      <td className="p-2">{event.timestamp}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default TestSurfaceTagEvents;
