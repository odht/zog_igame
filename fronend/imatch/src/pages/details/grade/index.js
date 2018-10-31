//  成绩表
//  LSY
//  2018-9-6
import styles from './index.css';
import GradeList from '../../../component/GradeList';
import * as detail from '../../../../mock/detail';

const { gradeData } = detail;
export default function () {
    return (
        <div className={styles.normal}>
            <GradeList
                gradeData={gradeData}
            />
        </div>
    );
}
