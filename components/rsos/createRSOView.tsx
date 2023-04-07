import React, { useState } from 'react';

const RSOCreateView = () => {
  const [name, setName] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [member, setMember] = useState('');
  const [admin, setAdmin] = useState('');

  const handleAddMems = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setMembers([...members, member]);
    setMember('');
  };

  const selectAdmin = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value = event.target.value;
    setAdmin(value);
  };

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const submitRSO = async (rso: {
    name: string | undefined | null;
    members: string[] | undefined | null;
    admin: string | undefined | null;
  }) => {
    const response = await fetch('/api/rsoCreate', {
      method: 'POST',
      body: JSON.stringify(rso),
    });

    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const rso = { name, members, admin };
    await submitRSO(rso);
    await timeout(1000);
    window.location.reload();
    setName('');
    setAdmin('');
    setMembers(['']);
    setMember('');
  };

  return (
    <div className="flex-col text-center py-24">
      <form>
        <div className="mx-auto max-w-md text-xl text-left xs:max-w-md sm:max-w-md md:max-w-md lg:max-w-md xl:max-w-md 2xl:max-w-md">
          <div className="mb-4 text-lg">
            <div className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg">
              RSO name:
            </div>
            <textarea
              maxLength={30}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              rows={1}
              cols={1}
              className="block p-2.5 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                        rounded-tl-none border-neutral-700 "
            ></textarea>{' '}
          </div>
          {/* <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                    border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Admin's Email:
            </div>
            <textarea
              maxLength={30}
              onChange={(e) => setAdmin(e.target.value)}
              rows={1}
              cols={1}
              required
              className="block p-2.5 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                      rounded-tl-none border-neutral-700 mb-4"
            ></textarea>{' '}
          </div> */}
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                    border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Member's Email:
            </div>
            <textarea
              maxLength={30}
              onChange={(e) => setMember(e.target.value)}
              value={member}
              rows={1}
              cols={1}
              className="block p-2.5 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                      rounded-tl-none border-neutral-700 mb-4"
            ></textarea>{' '}
            <div>
              <button onClick={handleAddMems}>
                <div
                  className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition
                      bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
                >
                  Add Member
                </div>
              </button>
            </div>
          </div>
          <div className={`${members.length === 0 ? 'hidden' : 'mb-4'}`}>
            <div className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg">
              Currently Selected Members:
            </div>
            <div
              className="block p-2.5 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                      rounded-tl-none border-neutral-700 "
            >
              {members.map((mem: any, index) => (
                <div key={index}>{mem}</div>
              ))}
            </div>
          </div>

          <div className={`${members.length === 0 ? 'hidden' : ''}`}>
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] 
                border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition 
                bg-neutral-300 text-lg"
            >
              Select Admin
            </div>
            <div
              className="flex flex-col p-2 w-full text-md text-gray-900 
              bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
            >
              <select
                name="memberDropDown"
                defaultValue={members[0]}
                onChange={selectAdmin}
              >
                {members.map((member: any) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="py-[32px]">
          <div className={`${members.length >= 5 ? '' : 'hidden'}`}>
            <button type="submit" onClick={handleSubmit}>
              <div
                className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition
                      bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
              >
                Submit
              </div>
            </button>
          </div>
          <div className={`${members.length < 5 ? '' : 'hidden'}`}>
            <button type="submit" disabled onClick={handleSubmit}>
              <div
                className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition
                      bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
              >
                Submit
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RSOCreateView;
