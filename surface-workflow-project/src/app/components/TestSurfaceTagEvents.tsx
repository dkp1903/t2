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

  useEffect(() => {
    const socket = new WebSocket('wss://3000-dkp1903-t2-da7401yta8s.ws-us116.gitpod.io/api/events'); // Your Gitpod WebSocket URL

    socket.onmessage = (event) => {
      const newEvent = JSON.parse(event.data);
      setEvents((prevEvents) => [newEvent, ...prevEvents]);
    };

    return () => socket.close();
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
              {events.map((event, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{event.eventName}</td>
                  <td className="p-2">{event.visitorId}</td>
                  <td className="p-2">{JSON.stringify(event.metadata)}</td>
                  <td className="p-2">{event.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TestSurfaceTagEvents;
