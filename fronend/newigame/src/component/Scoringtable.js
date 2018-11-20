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
    render() {
        const { scoringData, writeSoringData, isAdmin } = this.props;
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
                {/* <div>
                <ScoringFrom
                    submitType='create'
                    writeSoringData={writeSoringData}
                    scoringDataCraeate={scoringData}
                >
                    <Button
                        className={styles.submitButton}
                        type="primary">
                        添加记录
                   </Button>
                </ScoringFrom>
            </div>
            */}
                <Table
                    style={{ background: '#fff', minHeight: '59.5vh' }}
                    rowKey={row => row.id}
                    dataSource={scoringData}
                    columns={scoringColumns}
                    pagination
                />
            </div>
        )
    }
}


export default Scoringtable;

