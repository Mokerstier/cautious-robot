import AzureDemo from "src/ui/components/organisms/azure-demo";
import TopicView from "src/view/topic-view";

export const paths = {
    topicView: '/',
    graph: '/graph',
    demo: '/demo',

};

export const routes = [
    {
        path: paths.topicView,
        component: TopicView,
    },
    {
        path: paths.graph,
        component: TopicView,
    },
    {
        path: paths.demo,
        component: AzureDemo,
    }
];
