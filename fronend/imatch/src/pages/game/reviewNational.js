
import TeamList from'./review';
import * as review from './review';
const {TeamData}= review;
export default function() {
  return (
    <div >
      <TeamList
         TeamData={TeamData}
        />
    </div>
  );
}
