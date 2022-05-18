<?php

use model\Model;

class BrowserHistory extends Model {
    protected $table = 'browsing_history';

    public function insertBrowserHis($param) {
        $browse_time = date("Y-m-d H:i:s");
        $sql = $this->insert(['member_id' => $param['member_id'], 'product_id' => $param['product_id'], 'browse_time' => $browse_time]);
        $this->execute($sql);
    }

    public function getBrowserHis() {
        $sql = $this->select($this->table);
        return $this->execute($sql);
    }
}
