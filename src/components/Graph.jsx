import { useState, useCallback, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import "./Graph.css";
// or ForceGraph3D for 3D visualization

const Graph = () => {
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [selectedNode, setSelectedNode] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Much larger radius for fixed positions
  const radius = 80;
  const angleStep = (2 * Math.PI) / 3;
  let currentAngle = -Math.PI / 2;

  const allNodesAndLinks = {
    nodes: [
      {
        id: "stephanie",
        label: ["Stephanie", "Rodriguez"],
        group: "center",
        size: dimensions.width < 768 ? 15 : 20,
        level: 0,
        fx: 0, // Fixed position
        fy: 0,
      },
      // Level 1 nodes (always visible)
      {
        id: "career",
        label: ["Career", "Journey"],
        group: "primary",
        size: dimensions.width < 768 ? 12 : 15,
        description: "My journey through tech and finance",
        level: 1,
        fx: Math.cos(currentAngle) * radius, // Fixed position
        fy: Math.sin(currentAngle) * radius,
      },
      {
        id: "projects",
        label: ["Projects"],
        group: "primary",
        size: dimensions.width < 768 ? 12 : 15,
        description: "Key projects and achievements",
        level: 1,
        fx: Math.cos(currentAngle + angleStep) * radius, // Fixed position
        fy: Math.sin(currentAngle + angleStep) * radius,
      },
      {
        id: "about",
        label: ["About", "Me"],
        group: "primary",
        size: dimensions.width < 768 ? 12 : 15,
        description: "Background and interests",
        level: 1,
        fx: Math.cos(currentAngle + 2 * angleStep) * radius, // Fixed position
        fy: Math.sin(currentAngle + 2 * angleStep) * radius,
      },
      // Level 2 nodes (hidden by default)
      {
        id: "amazon",
        label: ["Amazon"],
        group: "career",
        size: dimensions.width < 768 ? 10 : 10,
        description: "Led web infrastructure initiatives at Prime Gaming",
        level: 2,
        parent: "career",
      },
      {
        id: "notion",
        label: "Notion",
        group: "career",
        size: dimensions.width < 768 ? 10 : 10,
        description: "Product Engineer for 2.5 years",
        level: 2,
        parent: "career",
      },
      {
        id: "capital",
        label: "Capital Group",
        group: "career",
        size: dimensions.width < 768 ? 10 : 10,
        description: "Quantitative Analyst managing $2.7T in assets",
        level: 2,
        parent: "career",
      },
    ],
    links: [
      // Level 1 links
      { source: "stephanie", target: "career", value: 3 },
      { source: "stephanie", target: "projects", value: 3 },
      { source: "stephanie", target: "about", value: 3 },
      // Level 2 links
      { source: "career", target: "amazon", value: 2, level: 2 },
      { source: "career", target: "notion", value: 2, level: 2 },
      { source: "career", target: "capital", value: 2, level: 2 },
    ],
  };

  // Calculate positions for child nodes when parent is expanded
  const getChildNodePositions = (parentNode, childCount) => {
    const childRadius = 60;
    const startAngle = -Math.PI / 3;
    const angleStep = (2 * Math.PI) / 3 / (childCount - 1);

    return Array.from({ length: childCount }).map((_, index) => {
      const angle = startAngle + angleStep * index;
      return {
        x: parentNode.fx + Math.cos(angle) * childRadius,
        y: parentNode.fy + Math.sin(angle) * childRadius,
      };
    });
  };

  // Filter nodes and links based on expanded state and selected node
  const graphData = {
    nodes: allNodesAndLinks.nodes.filter((node) => {
      if (!selectedNode) {
        return node.level <= 1;
      } else {
        const shouldShow =
          node.level === 0 || // Always show center node
          node.id === selectedNode.id || // Show selected node
          (expandedNodes.has(node.parent) && node.parent === selectedNode.id); // Show children if parent is expanded

        // Position child nodes when parent is expanded
        if (shouldShow && node.level === 2) {
          const parent = allNodesAndLinks.nodes.find((n) => n.id === node.parent);
          if (parent && expandedNodes.has(parent.id)) {
            const siblings = allNodesAndLinks.nodes.filter((n) => n.parent === parent.id);
            const childPositions = getChildNodePositions(parent, siblings.length);
            const childIndex = siblings.findIndex((n) => n.id === node.id);
            node.fx = childPositions[childIndex].x;
            node.fy = childPositions[childIndex].y;
          }
        }

        return shouldShow;
      }
    }),
    links: allNodesAndLinks.links.filter((link) => {
      if (!selectedNode) {
        return !link.level;
      } else {
        const sourceId = typeof link.source === "object" ? link.source.id : link.source;
        const targetId = typeof link.target === "object" ? link.target.id : link.target;

        const isSelectedNodeLink =
          (sourceId === "stephanie" && targetId === selectedNode.id) ||
          (sourceId === selectedNode.id && targetId === "stephanie");

        const isChildLink = expandedNodes.has(selectedNode.id) && sourceId === selectedNode.id;

        return isSelectedNodeLink || isChildLink;
      }
    }),
  };

  // Add useEffect for centering animation
  useEffect(() => {
    if (selectedNode) {
      const centerX = selectedNode.fx || selectedNode.x || 0;
      const centerY = selectedNode.fy || selectedNode.y || 0;
      const k = dimensions.width < 768 ? 1.2 : 1.5;

      // Animate to the new center
      const fg = document.querySelector(".force-graph-container");
      if (fg) {
        fg.style.transition = "transform 0.5s ease-in-out";
        fg.style.transform = `translate(${-centerX * k}px, ${-centerY * k}px) scale(${k})`;
      }
    } else {
      // Reset transform when no node is selected
      const fg = document.querySelector(".force-graph-container");
      if (fg) {
        fg.style.transition = "transform 0.5s ease-in-out";
        fg.style.transform = "none";
      }
    }
  }, [selectedNode, dimensions.width]);

  const handleNodeHover = useCallback(
    (node) => {
      setHoveredNode(node);
      if (!node) {
        setHighlightLinks(new Set());
        return;
      }

      // Highlight all links connected to this node
      const connectedLinks = graphData.links
        .filter((link) => {
          const sourceId = typeof link.source === "object" ? link.source.id : link.source;
          const targetId = typeof link.target === "object" ? link.target.id : link.target;
          return sourceId === node.id || targetId === node.id;
        })
        .map((link) => {
          const sourceId = typeof link.source === "object" ? link.source.id : link.source;
          const targetId = typeof link.target === "object" ? link.target.id : link.target;
          return sourceId + "-" + targetId;
        });

      setHighlightLinks(new Set(connectedLinks));
    },
    [graphData.links]
  );

  const handleNodeClick = useCallback(
    (node) => {
      if (node.level === 0) {
        // Reset view when clicking center node
        setSelectedNode(null);
        setExpandedNodes(new Set());
        return;
      }

      // If clicking a primary node (level 1)
      if (node.level === 1) {
        if (selectedNode && node.id === selectedNode.id) {
          // If it's already selected, toggle expansion
          setExpandedNodes((prev) => {
            const newSet = new Set(prev);
            if (prev.has(node.id)) {
              newSet.delete(node.id);
            } else {
              newSet.add(node.id);
            }
            return newSet;
          });
        } else {
          // If selecting a different primary node, collapse any expanded nodes
          setSelectedNode(node);
          setExpandedNodes(new Set());
        }
      } else if (node.level === 2) {
        // If clicking a child node, collapse siblings and select parent
        const parentNode = allNodesAndLinks.nodes.find((n) => n.id === node.parent);
        if (parentNode) {
          setSelectedNode(parentNode);
          setExpandedNodes(new Set([parentNode.id]));
        }
      }

      // Zoom animation
      const distance = dimensions.width < 768 ? 20 : 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y);
      return node.x || node.y ? { x: node.x * distRatio, y: node.y * distRatio } : { x: 0, y: 0 };
    },
    [dimensions.width, selectedNode, allNodesAndLinks.nodes]
  );

  return (
    <div className="graph-container">
      <ForceGraph2D
        graphData={graphData}
        width={dimensions.width}
        height={Math.min(dimensions.height * 0.9, 1200)}
        nodeRelSize={dimensions.width < 768 ? 4 : 6}
        nodeVal={(node) => node.size * (hoveredNode?.id === node.id ? 1.4 : 1)}
        nodeLabel={(node) => node.description || node.label}
        linkWidth={(link) => (highlightLinks.has(link.source.id + "-" + link.target.id) ? 2 : 1)}
        linkDirectionalParticles={0} // Remove particles
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        nodeCanvasObject={(node, ctx) => {
          const isHovered = hoveredNode?.id === node.id;
          const fontSize =
            dimensions.width < 768 ? (node.group === "center" ? 6 : 5) : node.group === "center" ? 7 : 5.5;

          // Draw text
          ctx.font = `${node.group === "center" ? "500" : "400"} ${fontSize}px Inter`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = isHovered ? "#000" : "#333";

          // Handle multi-line text
          const lineHeight = fontSize * 1.4;
          const lines = Array.isArray(node.label) ? node.label : [node.label];
          const totalHeight = lines.length * lineHeight;

          lines.forEach((line, i) => {
            const y = node.y - totalHeight / 2 + i * lineHeight + lineHeight / 2;
            ctx.fillText(line, node.x, y);
          });
        }}
        cooldownTicks={100}
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.3}
        warmupTicks={200}
        d3Force={(d3) => {
          // Simple forces just for Level 2 nodes
          d3.force("charge").strength(-200);

          d3.force(
            "collision",
            d3.forceCollide(() => 60)
          );

          // Minimal link force since positions are fixed
          d3.force("link").strength(0.4);

          // No center force needed
          d3.force("center", null);
        }}
        centerAt={[0, 0]}
        onEngineStop={() => {
          if (!selectedNode) {
            const distanceToFit = dimensions.width < 768 ? 400 : 500;
            return { x: 0, y: 0, k: dimensions.width / distanceToFit };
          }
        }}
      />
      {selectedNode && (
        <div className={`node-info ${dimensions.width < 768 ? "mobile" : ""}`}>
          <h3>{Array.isArray(selectedNode.label) ? selectedNode.label.join(" ") : selectedNode.label}</h3>
          <p>{selectedNode.description}</p>
          {selectedNode.level < 2 && !expandedNodes.has(selectedNode.id) && (
            <p className="click-hint">Click to expand</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Graph;
