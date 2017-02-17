
import angular from 'angular';

const env = angular.module("config", [])
.constant("ENV", {"name":"devel","api":{"endpoint":"http://data.unobrain.com","token":"miprodtoken"}});


export default env;

