import React, { Component } from 'react';
import { Table, Button } from 'antd';
import ScoringFrom from './ScoringFrom';
import styles from './Scoringtable.css';

class Scoringtable extends Component {
    isAdmin = () => {
        const password = prompt('管理员密码');
        if (password === 'b') {
            this.props.changeAdmin()
        }
    }
    componentDidMount() {
        const { scoringData } = this.props;
        // console.log(scoringData)
        //  let a =for (let state of scoringData) if(state === 'done');

    }
    render() {
        const { scoringData, writeSoringData, isAdmin, loading, handleSbumitScore } = this.props;
        let isOk = false;
        if (scoringData.length > 0) {
            const isOKArry = scoringData.filter(item => item.state === 'bidding');
            if (isOKArry.length <= 0) {
                isOk = true;
            }
        }
        const scoringColumns = [
            {
                title: '牌号',
                dataIndex: 'number',
                align: "center",
            },
            {
                title: '局况',
                dataIndex: 'vulnerable',
                align: "center",
            },
            {
                title: '庄家',
                dataIndex: 'declarer',
                align: "center"
            },
            {
                title: '定约',
                dataIndex: 'contract',
                align: "center"
            },
            {
                title: '首攻',
                dataIndex: 'openlead',
                align: "center"
            },
            {
                title: '结果',
                dataIndex: 'result',
                align: "center"
            }, {
                title: '南北得分',
                dataIndex: 'ns_point',
                align: "center",
            }, {
                title: "东西得分",
                dataIndex: 'ew_point',
                align: "center",
            },
            {
                title: '操作',
                align: "center",
                render: (record) => {
                    return (
                        <React.Fragment>
                            {record.state === 'done' && !isAdmin ?
                                <a
                                    onClick={this.isAdmin}
                                    className={styles.submitA}
                                    href="#"
                                >
                                    修改
                                </a> :
                                <ScoringFrom
                                    writeSoringData={writeSoringData}
                                    submitType='update'
                                    scoringData={record}
                                >
                                    <a
                                        className={styles.submitA}
                                        href="#"
                                    >
                                        录入
                             </a>
                                </ScoringFrom>
                            }
                        </React.Fragment>
                    );
                }
            }
        ];
        return (
            <div>
                <Table
                    loading={loading}
                    style={{ background: '#fff', minHeight: '59.5vh' }}
                    rowKey={row => row.id}
                    dataSource={scoringData}
                    columns={scoringColumns}
                    pagination={false}
                // pagination={{
                // pageSize: scoringData.length,
                // }}
                />
                <div className={styles.isOkBox}>
                    <Button onClick={() => handleSbumitScore()} className={styles.isOk} type="primary" disabled={!isOk}>审核提交</Button>
                </div>
            </div>
        )
    }
}


export default Scoringtable;

