import { useState, useCallback, useEffect, useRef } from "react";
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

  // Add state history tracking
  const [history, setHistory] = useState([{ selectedNode: null, expandedNodes: new Set() }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isNavigating = useRef(false);

  // Navigation state
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  // Add state for simulation time
  const [simulationTime, setSimulationTime] = useState(0);

  // Update history when state changes (debounced)
  useEffect(() => {
    if (isNavigating.current) {
      isNavigating.current = false;
      return;
    }

    const newState = {
      selectedNode,
      expandedNodes: new Set(Array.from(expandedNodes)), // Create deep copy of Set
    };

    // Only add to history if state actually changed
    const lastState = history[currentIndex];
    const hasSelectedNodeChanged = lastState.selectedNode?.id !== newState.selectedNode?.id;
    const hasExpandedNodesChanged =
      lastState.expandedNodes.size !== newState.expandedNodes.size ||
      Array.from(lastState.expandedNodes).some((id) => !newState.expandedNodes.has(id));

    if (hasSelectedNodeChanged || hasExpandedNodesChanged) {
      setHistory((prev) => {
        const newHistory = prev.slice(0, currentIndex + 1);
        return [...newHistory, newState];
      });
      setCurrentIndex((prev) => prev + 1);
    }
  }, [selectedNode, expandedNodes, currentIndex, history]);

  // Navigation functions with improved state restoration
  const handleUndo = useCallback(() => {
    if (!canUndo) return;

    isNavigating.current = true;
    const previousState = history[currentIndex - 1];
    setSelectedNode(previousState.selectedNode);
    setExpandedNodes(new Set(Array.from(previousState.expandedNodes)));
    setCurrentIndex((prev) => prev - 1);
  }, [canUndo, history, currentIndex]);

  const handleRedo = useCallback(() => {
    if (!canRedo) return;

    isNavigating.current = true;
    const nextState = history[currentIndex + 1];
    setSelectedNode(nextState.selectedNode);
    setExpandedNodes(new Set(Array.from(nextState.expandedNodes)));
    setCurrentIndex((prev) => prev + 1);
  }, [canRedo, history, currentIndex]);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

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

  // Add animation frame effect
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      setSimulationTime((prev) => prev + 1);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
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
      // Add subtle movement to child positions
      const time = simulationTime * 0.001; // Slow down the movement
      const wobble = Math.sin(time + index) * 2; // Small wobble effect
      return {
        x: parentNode.fx + Math.cos(angle) * (childRadius + wobble),
        y: parentNode.fy + Math.sin(angle) * (childRadius + wobble),
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

  // Add useEffect for centering animation with cleanup
  useEffect(() => {
    let fg = document.querySelector(".force-graph-container");
    if (!fg) return;

    const handleTransitionEnd = () => {
      if (!selectedNode) {
        fg.style.transform = "none";
      }
    };

    fg.addEventListener("transitionend", handleTransitionEnd);

    if (selectedNode) {
      const centerX = selectedNode.fx || selectedNode.x || 0;
      const centerY = selectedNode.fy || selectedNode.y || 0;
      const k = dimensions.width < 768 ? 1.2 : 1.5;

      fg.style.transition = "transform 0.5s ease-in-out";
      fg.style.transform = `translate(${-centerX * k}px, ${-centerY * k}px) scale(${k})`;
    } else {
      fg.style.transition = "transform 0.5s ease-in-out";
      fg.style.transform = "none";
    }

    return () => {
      if (fg) {
        fg.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
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
          // If selecting a new primary node
          setSelectedNode(node);
          setExpandedNodes(new Set([node.id]));
        }
      } else if (node.level === 2) {
        // If clicking a child node, select its parent
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
      <div
        className="info-panel"
        style={{
          position: "fixed",
          top: "200px",
          left: "20px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          width: "120px", // Slightly wider for better text layout
          background: "rgba(255, 255, 255, 0.95)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,0,0,0.03)",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="graph-controls"
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: 0,
            width: "100%",
          }}
        >
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            style={{
              padding: "10px 0",
              width: "100%",
              opacity: canUndo ? 1 : 0.2,
              cursor: canUndo ? "pointer" : "not-allowed",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "8px",
              background: "white",
              fontSize: "16px",
              transition: "all 0.2s ease",
              color: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Inter, system-ui, sans-serif",
              boxShadow: canUndo ? "0 1px 2px rgba(0,0,0,0.04)" : "none",
              transform: canUndo ? "scale(1)" : "scale(0.98)",
            }}
          >
            ←
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            style={{
              padding: "10px 0",
              width: "100%",
              opacity: canRedo ? 1 : 0.2,
              cursor: canRedo ? "pointer" : "not-allowed",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "8px",
              background: "white",
              fontSize: "16px",
              transition: "all 0.2s ease",
              color: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Inter, system-ui, sans-serif",
              boxShadow: canRedo ? "0 1px 2px rgba(0,0,0,0.04)" : "none",
              transform: canRedo ? "scale(1)" : "scale(0.98)",
            }}
          >
            →
          </button>
        </div>
        {selectedNode ? (
          <div
            className={`node-info ${dimensions.width < 768 ? "mobile" : ""}`}
            style={{
              width: "100%",
              marginTop: "16px",
              opacity: 0.95,
              transition: "opacity 0.3s ease",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                color: "#222",
                fontSize: "15px",
                textAlign: "left",
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              {Array.isArray(selectedNode.label) ? selectedNode.label.join(" ") : selectedNode.label}
            </h3>
            <p
              style={{
                margin: "0 0 12px 0",
                color: "#555",
                lineHeight: "1.5",
                fontSize: "13px",
                textAlign: "left",
                fontFamily: "Inter, system-ui, sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              {selectedNode.description}
            </p>
            {selectedNode.level < 2 && !expandedNodes.has(selectedNode.id) && (
              <p
                className="click-hint"
                style={{
                  margin: 0,
                  color: "#888",
                  fontSize: "12px",
                  textAlign: "left",
                  fontFamily: "Inter, system-ui, sans-serif",
                  letterSpacing: "0.02em",
                  opacity: 0.8,
                }}
              >
                Click to expand
              </p>
            )}
          </div>
        ) : (
          <div
            className="initial-sections"
            style={{
              width: "100%",
              marginTop: "16px",
              opacity: 0.95,
              transition: "opacity 0.3s ease",
            }}
          >
            <h3
              style={{
                margin: "0 0 12px 0",
                color: "#222",
                fontSize: "15px",
                textAlign: "left",
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              Explore
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {allNodesAndLinks.nodes
                .filter((node) => node.level === 1)
                .map((node) => (
                  <button
                    key={node.id}
                    onClick={() => {
                      setSelectedNode(node);
                      setExpandedNodes(new Set([node.id]));
                    }}
                    style={{
                      padding: "10px 12px",
                      width: "100%",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: "8px",
                      background: "white",
                      fontSize: "13px",
                      textAlign: "left",
                      cursor: "pointer",
                      color: "#333",
                      transition: "all 0.2s ease",
                      fontFamily: "Inter, system-ui, sans-serif",
                      letterSpacing: "-0.01em",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                      ":hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
                        borderColor: "rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    {Array.isArray(node.label) ? node.label.join(" ") : node.label}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
      <ForceGraph2D
        graphData={graphData}
        width={dimensions.width}
        height={Math.min(dimensions.height * 0.9, 1200)}
        nodeRelSize={dimensions.width < 768 ? 4 : 6}
        nodeVal={(node) => {
          const baseSize = node.size * (hoveredNode?.id === node.id ? 1.4 : 1);
          // Add subtle pulse animation for selected node
          if (selectedNode?.id === node.id) {
            return baseSize * (1 + Math.sin(simulationTime * 0.004) * 0.1);
          }
          return baseSize;
        }}
        nodeLabel={(node) => node.description || node.label}
        linkWidth={(link) => {
          const isHighlighted = highlightLinks.has(link.source.id + "-" + link.target.id);
          if (isHighlighted) {
            return 2 * (1 + Math.sin(simulationTime * 0.005) * 0.2);
          }
          return 1;
        }}
        linkDirectionalParticles={(link) => (highlightLinks.has(link.source.id + "-" + link.target.id) ? 4 : 0)}
        linkDirectionalParticleSpeed={0.005}
        linkColor={(link) => {
          const isHighlighted = highlightLinks.has(link.source.id + "-" + link.target.id);
          return isHighlighted ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)";
        }}
        cooldownTime={Infinity} // Prevent simulation from stopping
        cooldownTicks={0} // Keep simulation running
        d3AlphaDecay={0} // Prevent decay to keep movement
        d3VelocityDecay={0.4} // Moderate velocity decay for smooth movement
        d3Force={(d3) => {
          // Enhanced forces for more natural movement
          d3.force("charge")
            .strength(-100) // Reduced strength for gentler repulsion
            .distanceMax(200);

          d3.force(
            "collision",
            d3.forceCollide(() => 70)
          );

          // Add custom forces for continuous movement
          d3.force("drift", (alpha) => {
            graphData.nodes.forEach((node) => {
              if (!node.fx && !node.fy) {
                // Only apply to non-fixed nodes
                const time = simulationTime * 0.001;
                // Create very subtle circular motion
                node.vx += Math.sin(time + node.index * 0.5) * alpha * 0.2;
                node.vy += Math.cos(time + node.index * 0.5) * alpha * 0.2;
              }
            });
          });

          d3.force("link")
            .strength((link) => link.value * 0.08) // Reduced strength for more movement
            .distance((link) => {
              const baseDistance = 60 + link.value * 10;
              // Add subtle oscillation to link distances
              return baseDistance + Math.sin(simulationTime * 0.002) * 2;
            });

          d3.force("center", null);
        }}
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
      />
    </div>
  );
};

export default Graph;
