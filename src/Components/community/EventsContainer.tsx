import { ImSpinner2 } from "react-icons/im";
import { TbFileSad } from "react-icons/tb";
import EventCard from "./EventCard";

interface IProps {
  loading: boolean;
  events: IEvent[]|null;
}
const EventsContainer = ({ events, loading }: IProps) => {
  return (
    <main className="flex flex-wrap p-3 h-[80vh] max-h-[80vh] overflow-y-auto no-scrollbar">
      {loading && (
        <div className="flex justify-center items-center h-[80vh] w-full">
          <ImSpinner2 className="text-5xl text-stone-50 animate-spin" />
        </div>
      )}
      {!loading && !events && (
        <section className="flex justify-center items-center h-[70vh] w-full">
          <div className="flex justify-center items-center text-stone-50">
            <TbFileSad className="text-5xl" />
            No Events in This Community.
          </div>
        </section>
      )}
      {
        (!loading && events) && events.map(event=><EventCard url={event.imageUrl} />)
      }
    </main>
  );
};

export default EventsContainer;
