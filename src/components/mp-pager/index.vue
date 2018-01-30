<template>
    <div class="mp-pager" v-if="totalPage" :class="{'justify': pageInfo}">
        <div class="mp-pager-control">
            <ul class="pagination">
                <li>
                    <a title="第一页" @click.stop.prevent="goPage(1)">«</a>
                </li>
                <li v-for="page in pageList" :key="page" :class="{'active': page === pageIndex}">
                    <a @click.stop.prevent="goPage(page)">{{page}}</a>
                </li>
                <li class="disabled" v-if="endIndex < totalPage">
                    <a>...</a>
                </li>
                <li>
                    <a title="最后一页" @click.stop.prevent="goPage(totalPage)">»</a>
                </li>
            </ul>
        </div>
        <div class="mp-pager-info" v-if="pageInfo">
            共
            <span class="text">{{totalPage}}</span>页<span class="text">{{total}}</span>
            条数据
            &nbsp;&nbsp;&nbsp;&nbsp;每页显示
            <select class="size" @change="changePageSize">
                <option v-for="size in pageSizeArray" :key="size" :value="size" :selected="size === pageSize">{{size}}</option>
            </select>
            条数据&nbsp;&nbsp;&nbsp;&nbsp;跳转到第
            <input type="text" class="skip" @keydown.enter.stop.prevent="skipPage($event)" />
            页
        </div>
    </div>
</template>

<style lang="less">
.mp-pager {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
}
.mp-pager.justify {
    text-align: left;
}
.mp-pager-control,
.mp-pager-info {
    display: inline-block;
}
.mp-pager.justify .mp-pager-control {
    float: right;
}
.mp-pager-control {
    font-size: 0;
}
.mp-pager-control .pagination {
    margin: 0;
}
.mp-pager-control .pagination > li > a, 
.mp-pager-control .pagination > li > span {
    font-size: 12px;
    line-height: 1.5;
    padding: 5px 10px;    
    cursor: pointer;
}
.mp-pager-info {    
    line-height: 30px;
}
.mp-pager-info .text {
    color: #428bca;
    padding: 0 5px;
}
.mp-pager-info input,
.mp-pager-info select {
    height: 22px;
    margin: 0 5px;
    padding: 1px;
    border: 1px solid #ccc;
    outline: 0;
}
.mp-pager-info input {
    width: 30px;
    text-align: center;
}
</style>

<script>
import util from '../../libs/util';

export default {
    props: {
        total: {
            type: Number,
            required: true
        },
        pageIndex: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 20
        },
        pageLength: {
            type: Number,
            default: 5
        },
        pageInfo: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            pageSizeArray: [this.pageSize, this.pageSize * 2, this.pageSize * 4, this.pageSize * 8],
            startIndex: 0,
            endIndex: 0,
            pageList: []
        };
    },
    computed: {
        totalPage () {
            return Math.ceil(this.total / this.pageSize);
        }
    },
    methods: {
        calcPage () {
            if (this.pageIndex <= this.startIndex || this.pageIndex === this.totalPage) {
                this.startIndex = Math.max(1, this.pageIndex - this.pageLength + 1);
            } else if (this.pageIndex >= this.endIndex) {
                this.startIndex = Math.min(this.pageIndex, this.totalPage - this.pageLength + 1);
            }
            this.endIndex = Math.min(this.startIndex + this.pageLength - 1, this.totalPage);
            this.pageList = [];
            for (var i = this.startIndex; i <= this.endIndex; i++) {
                this.pageList.push(i);
            }
        },
        onPaging () {            
            this.$nextTick(() => {
                this.$emit('on-paging', this.pageIndex, this.pageSize);
            });
        },
        goPage (pageIndex) {
            this.$emit('update:pageIndex', pageIndex);
        },
        skipPage (evt) {
            var pageIndex = +evt.target.value;
            if (!util.isInteger(pageIndex)) {
                alert('请输入整数页码');
                return;
            }
            if (pageIndex > this.totalPage || pageIndex <= 0) {
                alert('页码不在范围内');
                return;
            }
            evt.target.value = '';
            this.goPage(pageIndex);
        },
        changePageSize (evt) {
            var pageSize = +evt.target.value;
            this.$emit('update:pageSize', pageSize);
            if (this.pageIndex !== 1) {
                this.goPage(1);
            } else {
                this.$nextTick(() => {
                    this.onPaging();
                    this.calcPage();
                });
            }
        }
    },
    watch: {
        total () {
            this.calcPage();
        },
        pageIndex () {
            this.onPaging();
            this.calcPage();
        }
    }
}
</script>
