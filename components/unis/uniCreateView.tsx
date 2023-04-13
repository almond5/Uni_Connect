import React, { useState } from 'react';
import GoogleMapView from '../googleMapView';

const UniCreateView = () => {
  const [title, setTitle] = useState('');
  const [num_students, setNumStudents] = useState(0);
  const [body, setBody] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [lat, setLat] = useState(28.6024);
  const [lng, setLng] = useState(-81.2001);
  const [addr, setAddress] = useState(
    '4000 Central Florida Blvd, Orlando, FL 32816, USA'
  );

  const submitUni = async (university: {
    title: string | undefined | null;
    body: string | undefined | null;
    num_students: number | undefined | null;
    lat: number | undefined | null;
    lng: number | undefined | null;
    addr: string | undefined | null;
    num: string | undefined | null;
  }) => {
    const response = await fetch('/api/universityCreate', {
      method: 'POST',
      body: JSON.stringify(university),
    });

    const data = await response.json();
    console.log(data);
  };

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const num = phoneNumber.toLocaleString();

    const university = {
      title,
      body,
      num_students,
      lat,
      lng,
      addr,
      num
    };
    await submitUni(university);
    await timeout(1000);
    window.location.reload();
    setBody('');
    setTitle('');
    setPhoneNumber(0);
    setLat(28.6024);
    setLng(-81.2001);
    setAddress('');
  };

  return (
    <div className="flex-col text-center py-24">
      <form onSubmit={handleSubmit}>
        <div
          className="mx-auto max-w-md text-xl text-left xs:max-w-md sm:max-w-md 
        md:max-w-md lg:max-w-md xl:max-w-md 2xl:max-w-md"
        >
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              University Name:
            </div>
            <textarea
              maxLength={30}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              rows={1}
              cols={1}
              className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700 "
            ></textarea>{' '}
          </div>

          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Description:
            </div>
            <div>
              <textarea
                maxLength={322}
                value={body}
                onChange={(e) => [setBody(e.target.value)]}
                required
                rows={7}
                cols={1}
                className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
              ></textarea>{' '}
            </div>
          </div>

          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Phone #:
            </div>
            <input
              required
              onChange={(e) => setPhoneNumber(Number(e.target.value))}
              type="number"
              className="block p-2 w-36 text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700"
              name="phone"
              maxLength={11}
            />
          </div>

          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Address:
            </div>
            <div>
              <textarea
                maxLength={322}
                value={addr}
                disabled
                rows={1}
                cols={1}
                className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
              ></textarea>{' '}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <div
                className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
              >
                Latitude:
              </div>
              <textarea
                maxLength={32}
                style={{ overflow: 'hidden' }}
                value={lat}
                disabled
                rows={1}
                cols={18}
                className="block p-2 w-max text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
              ></textarea>{' '}
            </div>

            <div>
              <div
                className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
              >
                Longitude:
              </div>
              <textarea
                maxLength={0}
                style={{ overflow: 'hidden' }}
                value={lng}
                disabled
                rows={1}
                cols={18}
                className="block p-2  w-max text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
              ></textarea>{' '}
            </div>
          </div>

          <GoogleMapView setLat={setLat} setLng={setLng} setAddress={setAddress}></GoogleMapView>
        </div>

        <div className="py-[32px]">
          <button>
            <div
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition
             bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
            >
              Submit
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UniCreateView;
