import * as React from "react";
import { Spin, Table, Pagination } from "antd";
let styles = require("./listPage.less");

export class ListPageComponent extends React.Component {
  constructor(props: any, context: any) {
    super(props, context);
  }

  onChange = (page: number) => {
    let { onPaginationChanged } = this.props;
    if (onPaginationChanged) {
      onPaginationChanged(page);
    }
  };

  render() {
    let { condition, isShowLoading, dataSource, columns, editDialog, dataCount } = this.props;
    return (
      <div className={styles.listPage}>
        {condition && <div className={styles.condition}>{condition}</div>}

        <div className={styles.lineBelowCondition} />
        <div className={styles.tableList}>
          <Spin spinning={isShowLoading}>
            <Table dataSource={dataSource} columns={columns} size="middle" bordered={true} scroll={{ x: 1600, y: 500 }} pagination={false} />
            <div className={styles.pagination}>
              <Pagination defaultCurrent={1} showTotal={total => `总共 ${total} 条`} total={dataCount} hideOnSinglePage={true} defaultPageSize={10} onChange={this.onChange} />
            </div>
          </Spin>
        </div>
        {editDialog}
      </div>
    );
  }
}
