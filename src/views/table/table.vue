<template>
  <div class="home-container">
    <div class="home-container-top">
      <div
        :style="{ color: '#841584' }"
        @click="readWorkbookFromRemoteFile(fileUrl)"
      >
        readWorkbookFromRemoteFile
      </div>
    </div>
    <div class="table-container">
      <a-table :columns="columns" :data-source="tableData" :pagination="false">
        <span slot="changeMoney" slot-scope="text, record">
          <a-icon v-if="record.type == '收入'" style="color: red" type="rise" />
          <a-icon v-else style="color: green" type="fall" />
          {{ text }}
        </span>
      </a-table>
    </div>
  </div>
</template>
<script>
import * as XLSX from "xlsx";
const columns = [
  {
    title: "日期",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "金额变动类型",
    dataIndex: "type",
    key: "type",
    filters: [
      { text: "支出", value: "支出" },
      { text: "收入", value: "收入" },
    ],
    onFilter: (value, record) => record.type.includes(value),
  },
  {
    title: "金额变动详细类型",
    dataIndex: "detailType",
    key: "detailType",
  },
  {
    title: "变化金额",
    dataIndex: "changeMoney",
    key: "changeMoney",
    scopedSlots: { customRender: "changeMoney" },
    sorter: (a, b) => a.changeMoney - b.changeMoney,
  },
  {
    title: "使用人",
    dataIndex: "user",
    key: "user",
    filters: [
      { text: "male", value: "male" },
      { text: "female", value: "female" },
      { text: "family", value: "family" },
      { text: "children", value: "children" }
    ],
    onFilter: (value, record) => record.user.includes(value),
  },
  {
    title: "备注",
    dataIndex: "remarks",
    key: "remarks",
  },
];
export default {
  name: "Table",
  data() {
    return {
      tableData: [],
      columns,
      fileUrl:
        "https://afanticar-test.oss-cn-hangzhou.aliyuncs.com/aftpm/video-demo/YYYY-MM.xlsx",
    };
  },
  mounted() {
    console.log(XLSX);
    this.readWorkbookFromRemoteFile(this.fileUrl, this.setTable);
  },
  methods: {
    readWorkbookFromRemoteFile(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function (e) {
        if (xhr.status == 200) {
          var data = new Uint8Array(xhr.response);
          var workbook = XLSX.read(data, { type: "array" });
          var json = workbook.Sheets[workbook.SheetNames[0]];
          var newData = XLSX.utils.sheet_to_json(json, { header: 1 });
          console.log("workbook", workbook);
          console.log("json", json);
          if (callback) callback(newData);
        }
      };
      xhr.send();
    },
    setTable(data) {
      console.log(data);
      this.tableData = [];
      if (data.length > 1) {
        for (let i = 1; i < data.length; i++) {
          this.tableData.push({
            key: i,
            date: data[i][0],
            type: this.splitText(data[i][1]),
            detailType: this.splitText(data[i][2]),
            changeMoney: data[i][3],
            user: this.splitText(data[i][4]),
            remarks: data[i][5],
          });
        }
      }
      console.log(this.tableData);
    },
    // importFile: function (e) {
    //   var self = this;
    //   stream.fetch(
    //     { method: "GET", type: "text", url: this.fileUrl },
    //     function (res) {
    //       const wb = XLSX.read(res.data, { type: "base64" });
    //       const ws = wb.Sheets[wb.SheetNames[0]];
    //       self.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    //     }
    //   );
    // },
    // exportFile: function (e) {
    //   var self = this;
    //   const ws = XLSX.utils.aoa_to_sheet(this.data);
    //   const wb = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    //   const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });
    //   const body = wbout;
    //   stream.fetch(
    //     { method: "POST", type: "json", url: this.binUrl, body: body },
    //     function (res) {
    //       self.version = res.data.key;
    //     }
    //   );
    // },
    get_label: function (r, c) {
      return XLSX.utils.encode_cell({ r: r, c: c });
    },
    splitText(text) {
      if (text && text.indexOf("-") > 0) {
        return text.split("-")[1];
      } else {
        return text;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home-container {
  &-top {
  }
}
</style>
