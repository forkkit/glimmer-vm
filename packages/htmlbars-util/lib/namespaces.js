// ref http://dev.w3.org/html5/spec-LC/namespaces.html
var defaultNamespaces = {
    html: 'http://www.w3.org/1999/xhtml',
    mathml: 'http://www.w3.org/1998/Math/MathML',
    svg: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace'
};
export function getAttrNamespace(attrName) {
    var namespace;
    var colonIndex = attrName.indexOf(':');
    if (colonIndex !== -1) {
        var prefix = attrName.slice(0, colonIndex);
        namespace = defaultNamespaces[prefix];
    }
    return namespace || null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZXNwYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9odG1sYmFycy11dGlsL2xpYi9uYW1lc3BhY2VzLnRzIl0sIm5hbWVzIjpbImdldEF0dHJOYW1lc3BhY2UiXSwibWFwcGluZ3MiOiJBQUFBLHNEQUFzRDtBQUN0RCxJQUFJLGlCQUFpQixHQUFHO0lBQ3RCLElBQUksRUFBRSw4QkFBOEI7SUFDcEMsTUFBTSxFQUFFLG9DQUFvQztJQUM1QyxHQUFHLEVBQUUsNEJBQTRCO0lBQ2pDLEtBQUssRUFBRSw4QkFBOEI7SUFDckMsR0FBRyxFQUFFLHNDQUFzQztDQUM1QyxDQUFDO0FBRUYsaUNBQWlDLFFBQVE7SUFDdkNBLElBQUlBLFNBQVNBLENBQUNBO0lBRWRBLElBQUlBLFVBQVVBLEdBQUdBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO0lBQ3ZDQSxFQUFFQSxDQUFDQSxDQUFDQSxVQUFVQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN0QkEsSUFBSUEsTUFBTUEsR0FBR0EsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFDM0NBLFNBQVNBLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDeENBLENBQUNBO0lBRURBLE1BQU1BLENBQUNBLFNBQVNBLElBQUlBLElBQUlBLENBQUNBO0FBQzNCQSxDQUFDQSJ9