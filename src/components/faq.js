import React from 'react';

const styles = {
  base: {
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: '0 1em 1em 1em',
  },
};

class Faq extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div style={styles.base}>
        <section>
          <h1>การจ่ายเงิน</h1>
          <ul>
            <li>เลข 2 ตัว 3 ตัว ลด 10%</li>
            <li>เลขวิ่ง (เลขตัวเดียว) ไม่ลด</li>
          </ul>
        </section>
        <section>
          <h1>รางวัล</h1>
          <ul>
            <li>3 ตัวตรง บาทละ 500</li>
            <li>3 ตัวโต๊ด บาทละ 100</li>
            <li>2 ตัว บาทละ 70</li>
            <li>วิ่ง 3 ตัวบน x 2</li>
            <li>วิ่ง 2 ตัวล่าง x 3</li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Faq;
